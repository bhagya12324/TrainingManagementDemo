console.log("hi");
$(document).ready(function () {
    Datagrid.Grid();
});
var currentbatchId;
var Datagrid = (function () {
    
    function Grid() {
        console.log("Another error")
            $.ajax({
                url: "http://localhost:5117/api/BatchesDetails/GetBatchDetails",
                dataType: "json",
                success: function (data) {
                    $(".batchDetailsGrid").dxDataGrid({
                        dataSource: data,
                        columns: [
                            {
                                dataField: "batchName",
                                caption: "Batch Name",
                                width: 60,
                                cellTemplate: function (container, options) {
                                    $("<div>")
                                        .addClass("devgrid-padding")
                                        .text(options.value)
                                        .appendTo(container);
                                }
                                ,
                                headerCellTemplate: function (header, info) {
                                    $("<div>")
                                        .addClass("header-padding")
                                        .text(info.column.caption)
                                        .appendTo(header);
                                }

                            },
                            {
                                dataField: "date",
                                caption: "Date",
                                width: 70,
                                cellTemplate: function (container, options) {
                                    $("<div>")
                                        .addClass("devgrid-padding")
                                        .text(options.value)
                                        .appendTo(container);
                                }
                                ,
                                headerCellTemplate: function (header, info) {
                                    $("<div>")
                                        .addClass("header-padding")
                                        .text(info.column.caption)
                                        .appendTo(header);
                                }
                            },
                            {
                                dataField: "hoursTaken",
                                caption: "Hours Taken",
                                width: 150,
                                cellTemplate: function (container, options) {
                                    $("<div>")
                                        .addClass("devgrid-padding")
                                        .text(options.value)
                                        .appendTo(container);
                                },
                                headerCellTemplate: function (header, info) {
                                    $("<div>")
                                        .addClass("header-padding")
                                        .text(info.column.caption)
                                        .appendTo(header);
                                }
                            },
                            {
                                dataField: "topicsTaken",
                                caption: "Topics Taken",
                                width: 150,
                                cellTemplate: function (container, options) {
                                    $("<div>")
                                        .addClass("devgrid-padding")
                                        .text(options.value)
                                        .appendTo(container);
                                },
                                headerCellTemplate: function (header, info) {
                                    $("<div>")
                                        .addClass("header-padding")
                                        .text(info.column.caption)
                                        .appendTo(header);
                                }
                            },
                            {
                                dataField: "remarks",
                                caption: "Remarks",
                                width: 200,
                                cellTemplate: function (container, options) {
                                    $("<div>")
                                        .addClass("devgrid-padding")
                                        .text(options.value)
                                        .appendTo(container);
                                },
                                headerCellTemplate: function (header, info) {
                                    $("<div>")
                                        .addClass("header-padding")
                                        .text(info.column.caption)
                                        .appendTo(header);
                                }
                            }
                        ],
                        editing: {
                            mode: "popup",
                            allowUpdating: true,

                            popup: null,
                            form: {
                                items: [
                                    // form items go here
                                    { dataField: "collegeName", editorType: "dxTextBox" },
                                ]
                            }
                        },
                        onEditingStart: function (e) {
                            // Get the record being edited
                            var record = e.data;
                            // Get the date string from the API
                            var dateString = record.date;
                            // Convert the date string to a Date object
                            var date = new Date(dateString);
                            // Format the date as yyyy-mm-dd
                            var formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                            // Set the value of the date input
                            $('#editdate').val(formattedDate);

                            currentbatchId = record.batchId
                            console.log(record);
                            // Populate the form fields with the record data
                            $('#editbatchId').val(record.batchId);
                            $('#batchesDropdownMenuButton').text(record.batchName)
                            $('#batchdetailId').val(record.batchDetailId)
                            $('#edithourstaken').val(record.hoursTaken)
                            $('#edittopics').val(record.remarks)
                            $('#editremarks').val(record.topicsTaken)
                            // Show the Bootstrap modal sheet
                            $('#editdailyTaskModal').modal('show');
                            e.cancel = true;

                        }, filterRow:
                        {
                            visible: false,
                            showOperationChooser: false
                        },
                        headerFilter: {
                            visible: true
                        },
                        grouping: {
                            autoExpandAll: true
                        },
                        sorting: {
                            mode: "multiple"
                        },

                        columnMinWidth: 130,
                        columnAutoWidth: true,
                        hoverStateEnabled: true,
                        rowAlternationEnabled: true,

                    });

                    //combobox filling for Batches
                    $.ajax({
                        url: "http://localhost:5117/api/Batches/GetBatches",
                        dataType: "json",
                        success: function (response) {
                            var dropdownMenu = $("#batchesDropdown-menu");
                            dropdownMenu.empty();
                            $.each(response, function (index, item) {
                                dropdownMenu.append(`<a class="dropdown-item batches-Dropdown" href="#" value=${item.batchId}>${item.batchName}</a>`);
                            });
                            //combobox filling for edit batches
                            var dropdownMenu = $("#editbatchesDropdown-menu");
                            dropdownMenu.empty();
                            $.each(response, function (index, item) {
                                dropdownMenu.append(`<a class="dropdown-item editbatches-Dropdown" href="#" value=${item.batchId}>${item.batchName}</a>`);
                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(errorThrown);
                        }
                    });
                },
                error: function (error) {
                    console.log(error)
                }
        });
    }

    return {
        Grid: Grid
    }
})();



//functin for clikig batches dropdown
$(document).on("click", ".batches-Dropdown", function () {

    console.log("batches clicked")
    //console.log(this)

    //console.log(this.value)
    var batchId = $("#batchId").val();
    console.log("sd" + batchId)

    var selectedItem = $(this).attr("value");
    console.log("batch id" + selectedItem)
    $("#batchId").val(selectedItem);
    var selectedText = $(this).text();
    $("#dropdownMenuButton1").text(selectedText);


});


//function for edit batches dropdown vlick
$(document).on("click", ".editbatches-Dropdown", function () {
    var selectedItem = $(this).attr("value");
    if (currentbatchId != selectedItem) {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You are making change in batch which can affect more than one table!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '<span class="btn btn-danger">Yes,Change</span>',
            cancelButtonText: '<span class="btn btn-secondary">Cancel</span>',
            cancelButtonClass: 'mr-2'
        }).then((result) => {
            if (result.isConfirmed) {
                // OK button was clicked
                console.log("batch id" + selectedItem)
                $("#editbatchId").val(selectedItem);
                var selectedText = $(this).text();
                $("#batchesDropdownMenuButton").text(selectedText);
            } else {
                // Cancel button was clicked
                var btn = $(".cl");
                btn.trigger('click');
                btn.off('click');
            }
        });
    }



});


//IIFE for Saving Details of batch
var Batch = (function () {

    function addbatch() {

        // only for update var batchDetailId;
        var batchId = $("#batchId").val();
        var date = $("#date").val();
        var hoursTaken = $("#hourstaken").val();
        var topicsTaken = $("#topics").val();
        var remarks = $("#remarks").val();


        $.ajax({
            type: "POST",
            url: 'http://localhost:5117/api/BatchesDetails/AddBatchDetails',
            data: JSON.stringify({ batchDetailId: 1, batchId: batchId, date: date, hoursTaken: hoursTaken, topicsTaken: topicsTaken, remarks: remarks}),

            success: function (data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Daily Task has been added',
                    customClass: {
                        confirmButton: 'btn  btn-primary',
                    },
                });
                Datagrid.Grid();
                var btn = $(".cl");
                btn.trigger('click');
                btn.off('click');
            },
            error: function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'error',
                    text: error,
                    customClass: {
                        confirmButton: 'btn  btn-danger',
                    },
                });
                var btn = $(".cl");
                btn.trigger('click');
                btn.off('click');
            },
            contentType: "application/json",
        });
    }


    //edit batch details

    function editbatch() {

        var batchDetailId = $("#batchdetailId").val();
        var batchId = $("#editbatchId").val();
        var date = $("#editdate").val();
        var hoursTaken = $("#edithourstaken").val();
        var topicsTaken = $("#edittopics").val();
        var remarks = $("#editremarks").val();

        console.info("batchDetail" + batchDetailId + "batchId" + batchId + "Date" + date + "hours" + hoursTaken + "top" + topicsTaken + "remar" + remarks)
        $.ajax({
            type: "POST",
            url: 'http://localhost:5117/api/batchesdetails/updatebatchdetails',
            data: JSON.stringify({ batchDetailId: batchDetailId, batchId: batchId, date: date, hoursTaken: hoursTaken, topicsTaken: topicsTaken, remarks: remarks }),

            success: function (data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Daily Task has been edited',
                    customClass: {
                        confirmButton: 'btn  btn-primary',
                    },
                });
                Datagrid.Grid();
                var btn = $(".cl");
                btn.trigger('click');
                btn.off('click');
            },
            error: function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'error',
                    text: error,
                    customClass: {
                        confirmButton: 'btn  btn-danger',
                    },
                });
                var btn = $(".cl");
                btn.trigger('click');
                btn.off('click');
            },
            contentType: "application/json",
        });
    }

    return {
        addbatch: addbatch,
        editbatch: editbatch
    }
})();



//save button click
$(document).on("click", ".saveButton", function () {

    Batch.addbatch();
});
//edit save button
$(document).on("click", ".editsaveButton", function () {

    Batch.editbatch();
});
