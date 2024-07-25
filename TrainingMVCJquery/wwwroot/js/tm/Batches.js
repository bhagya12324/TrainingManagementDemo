var crud = (function () {
    function _GetBatches() {
        $.ajax({
            url: "http://localhost:5117/api/Batches/GetBatches",
            dataType: "json",
            success: function (data) {
                $("#batch-container").dxDataGrid({

                    dataSource: data,
                    showBorders: true,

                    editing:
                    {
                        mode: "row",
                        allowUpdating: true,

                    },
                    onEditingStart: function (e) {
                        var record = e.data;
                        console.log(record);

                        var enddateString = record.endDate;
                        var startdateString = record.startDate;
                        var tentativedateString = record.tentativeEndDate;

                        // Convert the date string to a Date object
                        var enddate = new Date(enddateString);
                        var startdate = new Date(startdateString);
                        var tentativeenddate = new Date(tentativedateString);

                        // Format the date as yyyy-mm-dd
                        var formattedDate = enddate.getFullYear() + '-' + ('0' + (enddate.getMonth() + 1)).slice(-2) + '-' + ('0' + enddate.getDate()).slice(-2);
                        var formattedstartDate = startdate.getFullYear() + '-' + ('0' + (startdate.getMonth() + 1)).slice(-2) + '-' + ('0' + startdate.getDate()).slice(-2);
                        var formattedtentativeendDate = tentativeenddate.getFullYear() + '-' + ('0' + (tentativeenddate.getMonth() + 1)).slice(-2) + '-' + ('0' + tentativeenddate.getDate()).slice(-2);

                        // Set the value of the date input
                        $('#editstartdate').val(formattedstartDate);
                        $('#edittentativeenddate').val(formattedtentativeendDate);
                        $('#editenddate').val(formattedDate);

                        $('#editBatchId').val(record.batchId);
                        $('#editname').val(record.batchName);
                        $('#editfees').val(record.fees);
                        $('#editfeespaid').val(record.feesPaid);
                        $('#editduration').val(record.duration);
                        $('#edithourstaken').val(record.hoursTaken);
                        $('#editdetails').val(record.details);
                        $('#editremarks').val(record.remarks);

                        // Show the Bootstrap modal sheet
                        $('#editBatchModal').modal('show');
                        e.cancel = true;
                    },

                    columns: [

                        {
                            dataField: "batchName",
                            caption: "Batch Name",
                            width: 150,
                            alignment: "center",

                            cellTemplate: function (container, options) {

                                $("<a>", {
                                    "style": "color:black;",
                                    "href": "javascript:void(0)",
                                    "text": options.text
                                }).appendTo(container).on("click", function () {
                                    showBatchDetailsModal(options.data);
                                });
                            },

                        },
                        {
                            dataField: "startDate",
                            caption: "Start Date",
                            dataType: "datetime",
                            format: "yy-MMM-dd",
                            width: 110


                        },

                        {
                            dataField: "endDate",
                            caption: "End Date",
                            dataType: "datetime",
                            format: "yy-MMM-dd",
                            width: 110


                        },
                        {
                            dataField: "fees",
                            caption: "Fees",
                            width: 100,
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
                            dataField: "feesPaid",
                            caption: "Fees Paid",
                            width: 100,
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
                            dataField: "duration",
                            caption: "Duration",
                            width: 100,
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
                            dataField: "status",
                            caption: "Status",
                            width: 100,
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

                        //adding link for showing the corresponding batch details
                        {

                            width: 140,
                            cellTemplate: function (container, options) {
                                $("<a>")
                                    .addClass("details-link")
                                    .text("View Details")
                                    .on("click", function () {

                                        showBatchDetails(options.data.batchId);
                                    })
                                    .appendTo(container);
                            }
                        }

                    ],

                    editing:
                    {
                        allowUpdating: true,
                        mode: "row"
                    },
                    columnResizingMode: "widget", // Enable column resizing
                    columnHidingEnabled: false, // Enable responsive columns
                    columnWidth: "5px", // Set a fixed column width
                    height: "auto",

                    filterRow:
                    {
                        visible: false,
                        showOperationChooser: false
                    },

                    pager: {
                        showPageSizeSelector: false,
                        allowedPageSizes: [5, 10, 20],
                        showInfo: false
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

                    hoverStateEnabled: true,
                    rowAlternationEnabled: true,
                    cssClass: 'custom-datagrid-style',
                });
                //searching for all columns in the table
                $(function () {
                    var dgi = $("#batch-container").dxDataGrid("instance");
                    $("#searchBox").on("keyup", function () {
                        var st = $(this).val();
                        dgi.filter(function (data) {
                            for (var column in data) {
                                if (data[column].toString().toLowerCase().indexOf(st.toLowerCase()) !== -1) {
                                    return true;
                                }
                            }
                            return false;
                        });
                    });
                });
            }
        });
    }



    function _AddBatch() {
        if (!$('#batch-form')[0].checkValidity()) {
            $("#submit-button").trigger("click");
            return
        }
        var name = $("#name").val();
        var startdate = $("#startdate").val();
        var tentativeenddate = $("#tentativeenddate").val();
        var enddate = $("#enddate").val();
        var fees = $("#fees").val();
        var feespaid = $("#feespaid").val();
        var duration = $("#duration").val();
        var hrs = $("#hourstaken").val();
        var status = $("#status").val();
        var remarks = $("#remarks").val();
        var details = $("#details").val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:5117/api/Batches/InsertBatches',
            data: JSON.stringify({
                batchId: 1, batchName: name, startDate: startdate, tentativeEndDate: tentativeenddate,
                endDate: enddate, fees: fees, feesPaid: feespaid, duration: duration, hoursTaken: hrs, status: status,
                remarks: remarks, details: details
            }),
            success: function () {

                swal({
                    title: "SUCCESS",
                    text: "Batch Added Successfully",
                    icon: "success",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
                var btn = $(".cl");
                btn.trigger('click');
                GetBatches();

            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                swal({
                    title: "ERROR ",
                    text: xhr.responseText,
                    icon: "warning",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                }); GetBatches();
            },
            contentType: 'application/json'

        });
    }
    function _UpdateBatch() {
        if (!$('#updateBatchForm')[0].checkValidity()) {
            $("#editsubmit").trigger("click");
            return
        }
        var name = $("#editname").val();
        var startdate = $("#editstartdate").val();
        var tentativeenddate = $("#edittentativeenddate").val();
        var enddate = $("#editenddate").val();
        var fees = $("#editfees").val();
        var feespaid = $("#editfeespaid").val();
        var duration = $("#editduration").val();
        var hrs = $("#edithourstaken").val();
        var status = $("#editstatus").val();
        var remarks = $("#editremarks").val();
        var details = $("#editdetails").val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:5117/api/Batches/UpdateBatch',
            data: JSON.stringify({
                batchId: 1, batchName: name, startDate: startdate, tentativeEndDate: tentativeenddate,
                endDate: enddate, fees: fees, feesPaid: feespaid, duration: duration, hoursTaken: hrs, status: status,
                remarks: remarks, details: details
            }),
            success: function () {
                swal({
                    title: "SUCCESS",
                    text: "Batch Updated Successfully",
                    icon: "success",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
                var btn = $(".cl");
                btn.trigger('click');
                GetBatches();
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                swal({
                    title: "ERROR ",
                    text: xhr.responseText,
                    icon: "warning",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                }); GetBatches();
            },
            contentType: 'application/json'

        });
    }

    return {
        _GetBatches: _GetBatches,
        _AddBatch: _AddBatch,
        _UpdateBatch: _UpdateBatch

    };

})();

crud._GetBatches();

function GetBatches() {
    crud._GetBatches()
}
function AddBatch() {
    crud._AddBatch();

}
function UpdateBatch() {
    crud._UpdateBatch()
}

////to show the details of batch 
function showBatchDetailsModal(data) {
    console.log("HI");
    $('#batchDetailsModal   .modal-body').empty();
    $("#batchContent").empty();
    // Create a modal element and add it to the DOM
    var modal = $("<div>", {
        "class": "modal fade",
        "id": "batchDetailsModal",
        "tabindex": "-1",
        "role": "dialog"
    }).appendTo("body");

    // Create the modal content using the  data
    var content = $("<div>", {
        "class": "modal-dialog modal-dialog-centered",
        "role": "document",
        "id": "batchContent"
    }).appendTo("#batchDetailsModal");

    $("<div>", {
        "class": "modal-content",
        "id": "batchModalContent"
    }).appendTo("#batchContent");

    $("<div>", {
        "class": "modal-header",
        "id": "batch-modal-head"
    }).appendTo("#batchModalContent");

    $("<h4>", {
        "class": "modal-title",
        "text": "Batch Details"
    }).appendTo("#batch-modal-head");

    $("<button>", {
        "type": "button",
        "class": "close",
        "id": "batchdetailclose",
        "data-dismiss": "modal",
        "aria-label": "Close"
    }).appendTo("#batch-modal-head");

    $("<span>", {
        "aria-hidden": "true",
        "html": "&times;"
    }).appendTo("#batchdetailclose");

    $("<div>", {
        "class": "modal-body",
        "id": "batchModalBody"
    }).appendTo("#batchModalContent");

    $("<div>", { "class": "form-group row" })
        .append($("<label>", { "class": "col-sm-4 col-form-label label-colon", "text": "Batch Name" }))
        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": data.batchName })))
        .appendTo("#batchModalBody");

    $("<div>", { "class": "form-group row" })
        .append($("<label>", { "class": "col-sm-4 col-form-label  label-colon", "text": "Start Date" }))
        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": data.startDate })))
        .appendTo("#batchModalBody");

    $("<div>", { "class": "form-group row" })
        .append($("<label>", { "class": "col-sm-4 col-form-label", "text": "End Date" }))
        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": data.endDate })))
        .appendTo("#batchModalBody");

    $("<div>", { "class": "form-group row" })
        .append($("<label>", { "class": "col-sm-4 col-form-label", "text": "Tentative End Date" }))
        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": data.tentativeEndDate })))
        .appendTo("#batchModalBody");

    $("<div>", { "class": "form-group row" })
        .append($("<label>", { "class": "col-sm-4 col-form-label", "text": "Fees" }))
        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": data.fees })))
        .appendTo("#batchModalBody");

    $("<div>", { "class": "form-group row" })
        .append($("<label>", { "class": "col-sm-4 col-form-label", "text": "Fees Paid" }))
        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": data.feesPaid })))
        .appendTo("#batchModalBody");

    $("<div>", { "class": "form-group row" })
        .append($("<label>", { "class": "col-sm-4 col-form-label", "text": "Duration" }))
        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": data.duration })))
        .appendTo("#batchModalBody");

    $("<div>", { "class": "form-group row" })
        .append($("<label>", { "class": "col-sm-4 col-form-label", "text": "Hours Taken" }))
        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": data.hoursTaken })))
        .appendTo("#batchModalBody");


    $("<div>", { "class": "form-group row" })
        .append($("<label>", { "class": "col-sm-4 col-form-label", "text": "Status" }))
        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": data.status })))
        .appendTo("#batchModalBody");


    $("<div>", { "class": "form-group row" })
        .append($("<label>", { "class": "col-sm-4 col-form-label", "text": "Details" }))
        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": data.details })))
        .appendTo("#batchModalBody");


    $("<div>", { "class": "form-group row" })
        .append($("<label>", { "class": "col-sm-4 col-form-label", "text": "Remarks" }))
        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": data.remarks })))
        .appendTo("#batchModalBody");

    // Show the modal
    $('#batchDetailsModal').modal("show");

}


function showBatchDetails(batchId) {

    $.ajax({
        url: "http://localhost:5117/api/BatchesDetails/ShowBatchDetails?id=" + batchId,
        type: "POST",
        success: function (data) {
            console.log("success " + data
            );

            if (data.length > 0) {
                $('#batchDetails  .modal-body').empty();
                $("#batchDetailsContent").empty();

                // Create a modal element and add it to the DOM
                var modal = $("<div>", {
                    "class": "modal fade",
                    "id": "batchDetails",
                    "tabindex": "-1",
                    "role": "dialog"
                }).appendTo("body");

                // Create the modal content using the batch data
                var content = $("<div>", {
                    "class": "modal-dialog modal-dialog-centered",
                    "role": "document",
                    "id": "batchDetailsContent"
                }).appendTo("#batchDetails");

                $("<div>", {
                    "class": "modal-content",
                    "id": "batchDetailContent"
                }).appendTo("#batchDetailsContent");

                $("<div>", {
                    "class": "modal-header",
                    "id": "batch-modal-header"
                }).appendTo("#batchDetailContent");

                $("<h4>", {
                    "class": "modal-title",
                    "text": "BATCH DETAILS"
                }).appendTo("#batch-modal-header");

                $("<button>", {
                    "type": "button",
                    "class": "close",
                    "id": "batchclose",
                    "data-dismiss": "modal",
                    "aria-label": "Close"
                }).appendTo("#batch-modal-header");

                $("<span>", {
                    "aria-hidden": "true",
                    "html": "&times;"
                }).appendTo("#batchclose");

                $("<div>", {
                    "class": "modal-body",
                    "id": "batchDetailBody"
                }).appendTo("#batchDetailContent");

                data.forEach(function (dat) {
                    $("<div>", { "class": "form-group row" })
                        .append($("<label>", { "class": "col-sm-4 col-form-label  label-colon", "text": "Date" }))
                        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": dat.date })))
                        .appendTo("#batchDetailBody");


                    $("<div>", { "class": "form-group row" })
                        .append($("<label>", { "class": "col-sm-4 col-form-label", "text": "Hours Taken" }))
                        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": dat.hoursTaken })))
                        .appendTo("#batchDetailBody");


                    $("<div>", { "class": "form-group row" })
                        .append($("<label>", { "class": "col-sm-4 col-form-label", "text": "Topics Taken" }))
                        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": dat.topicsTaken })))
                        .appendTo("#batchDetailBody");


                    $("<div>", { "class": "form-group row" })
                        .append($("<label>", { "class": "col-sm-4 col-form-label", "text": "Remarks" }))
                        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": dat.remarks })))
                        .appendTo("#batchDetailBody");

                    $("<hr>").appendTo("#batchDetailBody");
                });

                // Show the modal
                $('#batchDetails').modal("show");

            }
            else {
                swal({
                    title: "INFO ",
                    text: "No batchdetails found",
                    icon: "info",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(" batch details Error: " + textStatus);
        }
    });
}








