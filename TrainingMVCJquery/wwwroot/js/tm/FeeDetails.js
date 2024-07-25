
var fees = (function () {

    function _GetFeeDetails() {
        $.ajax({
            url: "http://localhost:5117/api/FeesDetails/GetFeeDetails",
            dataType: "json",
            success: function (data) {
                $("#fee-container").dxDataGrid({
                    dataSource: data,
                    showBorders: true,
                    editing:
                    {
                        mode: "row",
                        allowUpdating: true,

                    },
                    onEditingStart: function (e) {
                        console.log("Editing started");
                        var record = e.data;
                        console.log(record);


                        var dateString = record.date;
                       
                        // Convert the date string to a Date object
                        var feedate = new Date(dateString);

                        // Format the date as yyyy-mm-dd
                        var formattedDate = feedate.getFullYear() + '-' + ('0' + (feedate.getMonth() + 1)).slice(-2) + '-' + ('0' + feedate.getDate()).slice(-2);
                      
                        // Set the value of the date input
                        $('#editdate').val(formattedDate);

                        $('#editbatchId').val(record.batchId);

                        $('#editfeesId').val(record.feesId);
                        $('#editamount').val(record.amount);
                        $('#editremarks').val(record.remarks);

                        // Show the Bootstrap modal sheet
                        $('#editFeeModal').modal('show');

                        e.cancel = true;


                    },
                    columns: [
                        {
                            dataField: "batchName",
                            caption: "Batch Name",
                            width: 200

                        },
                        {
                            dataField: "date",
                            caption: " Date",
                            width: 200

                        },
                        {
                            dataField: "amount",
                            caption: " Amount",
                            width: 200

                        },

                        {
                            dataField: "remarks",
                            caption: "Remarks",
                            width: 200,

                        }

                    ],


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

                $(function () {
                    var dgi = $("#fee-container").dxDataGrid("instance");
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

                //dropdwon filling
                $.ajax({
                    url: "http://localhost:5117/api/Batches/GetBatches",
                    dataType: "json",
                    success: function (batches) {
                        var dropdownMenu = $("#fees-menu");
                        dropdownMenu.empty();
                        $.each(batches, function (index, batch) {
                            dropdownMenu.append(`<a class="dropdown-item fees-Dropdown" href="#" value=${batch.batchId}>${batch.batchName}</a>`);
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });

                $('#fees-menu').on('change', function () {
                    var selectedValue = $(this).val(); // Get the selected value
                    console.log('Selected value: ' + selectedValue);
                });

            }
        });
    }

    function _AddFeeDetails() {
        if (!$('#addFeeForm')[0].checkValidity()) {
            $("#submit-button").trigger("click");
            return
        }
        var batchId = $("#batchId").val();
        var date = $("#date").val();
        var amount = $("#amount").val();
        var remarks = $("#remarks").val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:5117/api/FeesDetails/AddFeeDetails',
            data: JSON.stringify({
                FeesId: 1, batchId: batchId, date: date, amount: amount, remarks: remarks
            }),
            contentType: 'application/json',
            success: function () {


                swal({
                    title: "SUCCESS",
                    text: "Fee Details Added Successfully",
                    icon: "success",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
                var btn = $(".cl");
                btn.trigger('click');
                GetFeeDetails();
            },
            error: function (error) {
                console.log(error);
                swal({
                    title: "ERROR " + error.status,
                    text: error.statusText + " Insertion Failed!! Try Again",
                    icon: "error",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
                GetFeeDetails();

            }
        });
    }
    function _UpdateFeeDetails()
    //req field validation during form submission
    {
        if (!$('#updateFeeForm')[0].checkValidity()) {
            $("#sub").trigger("click");
            return
        }
        var editfeesId = $("#editfeesId").val();
        var editbatchId = $("#editbatchId").val();

        var editdate = $('#editdate').val()
        var editamount = $('#editamount').val()
        var editremarks = $('#editremarks').val()

        console.log(editfeesId);
        console.log(editbatchId);

        console.log(editdate);
        console.log(editamount);
        console.log(editremarks);


        $.ajax({
            type: 'POST',
            url: 'http://localhost:5117/api/FeesDetails/EditFeeDetails',
            data: JSON.stringify({
                feesId: editfeesId, batchId:editbatchId,date: editdate, amount: editamount, remarks: editremarks
            }),
            contentType: 'application/json',
            success: function () {


                swal({
                    title: "SUCCESS",
                    text: "Updated Successfully",
                    icon: "success",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
                var btn = $(".cl");
                btn.trigger('click');
                GetFeeDetails();



            },
            error: function (error) {
                console.log(error);
                swal({
                    title: "ERROR ",
                    text: " updation Failed!! Try Again",
                    icon: "error",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
                GetFeeDetails();

            }
        });
    }

    return {
        _GetFeeDetails: _GetFeeDetails,
        _AddFeeDetails: _AddFeeDetails,
        _UpdateFeeDetails: _UpdateFeeDetails

    };


})();


$(document).on("click", ".fees-Dropdown", function () {
    var selectedItem = $(this).attr("value");
    $("#batchId").val(selectedItem);
    var selectedText = $(this).text();
    console.log(selectedItem);
    console.log(selectedText);

    $("#dropdownMenuButton").text(selectedText);


});


$(document).ready(function () {
    fees._GetFeeDetails();
});

function GetFeeDetails() {
    fees._GetFeeDetails()
}

function AddFeeDetails() {
    fees._AddFeeDetails();

}
function UpdateFeeDetails() {
    fees._UpdateFeeDetails();

}
