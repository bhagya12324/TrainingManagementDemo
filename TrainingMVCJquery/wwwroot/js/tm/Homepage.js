////var batchesDataSource = new DevExpress.data.DataSource({
////    key: "BatchId",
////    load: function () {
////        return $.getJSON("http://localhost:5117/api/Batches/GetBatches");
////    }
////});
////console.log(batchesDataSource)
////var batchDetailsDataSource = new DevExpress.data.DataSource({
////    key: "BatchDetailId",
////    load: function () {
////        return $.getJSON("http://localhost:5117/api/BatchesDetails/GetBatchDetails");
////    },
////    filter: ["BatchId", "=", null] // Set the initial filter to retrieve only top-level BatchDetails records
////});

////$(document).ready(function () {
////    console.log(batchesDataSource)


////    $("#gridContainer").dxDataGrid({
////        dataSource: batchesDataSource,
////        columns: [
////            { dataField: "batchName", caption: "Batch Name" },
////            { dataField: "startDate", caption: "Start Date" }
////        ],
////        onRowExpanded: function (e) {
////            var batchId = e.key;
////            var childGrid = $("<div>").appendTo(e.detailCell);

////            childGrid.dxDataGrid({
////                dataSource: {
////                    store: batchDetailsDataSource,
////                    filter: ["BatchId", "=", batchId]
////                },
////                columns: [
////                    { dataField: "topicsTaken", caption: "Topics Taken" },
////                    { dataField: "hours", caption: "Hours" },
////                    { dataField: "remarks", caption: "Remarks" }
////                ]
////            });
////        }
////    });


////});






var batchDataSource = new DevExpress.data.DataSource({
    load: function (loadOptions) {
        // Load the Batch data from the API
        return $.getJSON('http://localhost:5117/api/Batches/GetBatches', loadOptions);
    },
    key: 'BatchId'
});

var batchDetailsDataSource = new DevExpress.data.DataSource({
    load: function (loadOptions) {
        // Load the BatchDetails data from the API
        return $.getJSON('http://localhost:5117/api/BatchesDetails/GetBatchDetails', loadOptions);
    },
    key: 'BatchDetailsId'
});

var gridOptions = {
    dataSource: {
        load: function (loadOptions) {
            var batchData = batchDataSource.load(loadOptions);
            var batchDetailsData = batchDetailsDataSource.load(loadOptions);

            return $.when(batchData, batchDetailsData).then(function (batchData, batchDetailsData) {
                // Merge the Batch and BatchDetails data into a single object
                var mergedData = batchData.map(function (batch) {
                    batch.BatchDetails = batchDetailsData.filter(function (batchDetail) {
                        return batchDetail.BatchId == batch.BatchId;
                    });
                    return batch;
                });
                return mergedData;
            });
        },
        key: 'BatchId'
    },
    columns: [
        // define columns for Batch grid here
    ],
    masterDetail: {
        enabled: true,
        template: function (container, options) {
            var detailGrid = $('<div>').dxDataGrid({
                dataSource: options.data.BatchDetails,
                columns: [
                    // define columns for BatchDetails grid here
                ]
            });
            detailGrid.appendTo(container);
        }
    }
};

$('#gridContainer').dxDataGrid(gridOptions);
