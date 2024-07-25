var college = (function () {
    //function to show all the college details
    function _GetColleges() {
        $.ajax({
            url: "http://localhost:5117/api/Colleges/GetColleges/",
            dataType: "json",
            success: function (data) {
                console.log("success triggered");
                console.log($("#card-container"))
                $("#card-container").dxDataGrid({
                    dataSource: data,
                    columns: [

                        {
                            dataField: "collegeName",
                            caption: "College Name",
                            width: 150,
                            cellTemplate: function (container, options) {
                                $("<div>")
                                    .addClass("cell-padding")
                                    .text(options.value)
                                    .appendTo(container);
                            },
                            

                            alignment: "center",
                            cellTemplate: function (container, options) {

                                $("<a>", {
                                    "style": "color:black;",
                                    "href": "javascript:void(0)",
                                    "text": options.text
                                }).appendTo(container).on("click", function () {
                                    showCollegeDetailsModal(options.data);
                                });
                            },
                            headerCellTemplate: function (header, info) {
                                $("<div>")
                                    .addClass("header-padding")
                                    .text(info.column.caption)
                                    .appendTo(header);
                            },
                            






                        },
                        {
                            dataField: "location",
                            caption: "Location",
                            width: 200


                        },
                        {
                            dataField: "remarks",
                            caption: "Remarks",

                            width: 200


                        },
                        {
                            width: 140,
                            cellTemplate: function (container, options) {
                                $("<a>")
                                    .addClass("details-link")
                                    .text("View Trainee Details")
                                    .on("click", function () {
                                        showTraineeDetails(options.data.collegeId);
                                    })
                                    .appendTo(container);
                            }
                        }
                    ],
                    editing: {
                        mode: "row",

                        allowUpdating: true,
                        allowDeleting: false,
                        allowAdding: false,
                        editRow: {
                            caption: "Edit"
                        },
                        popup: null,
                        form: {
                            items: [
                                // form items go here
                                { dataField: "evaluationName", editorType: "dxTextBox" },
                            ]
                        }
                    },
                    onEditingStart: function (e) {

                        $('#editModal').modal('show');

                        // Get the record being edited
                        var record = e.data;
                        console.log(record);
                        
                        $('#editCollegeId').val(record.collegeId);
                        $('#editname').val(record.collegeName);
                        $('#editlocation').val(record.location);
                        $('#editremarks').val(record.remarks);

                        e.cancel = true;

                    },



                    filterRow:
                    {
                        visible: false,
                        showOperationChooser: false
                    },
                    paging: {
                        enabled: false,
                        pageSize: 10
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
                    //selection: {
                    //    mode: "multiple"
                    //},

                    hoverStateEnabled: true,
                    rowAlternationEnabled: true,
                    cssClass: 'custom-datagrid-style',

                    // edit
                });
                //searching for all columns in the table
                $(function () {
                    var dgi = $("#card-container").dxDataGrid("instance");
                    $("#searchBox").on("keyup", function () {
                        var st = $(this).val();
                        dgi.filter(function (data) {
                            for (var column in data) {
                                if (data[column] .toString().toLowerCase().indexOf(st.toLowerCase()) !== -1) {
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

    //add college function
    function _AddCollege() {
        console.log("hello");



        var name = $("#name").val();
        var location = $("#location").val();
        var remarks = $("#remarks").val();



        $.ajax({
            type: 'POST',
            url: 'http://localhost:5117/api/Colleges/InsertCollege/',
            data: JSON.stringify({
                collegeId: 1, collegeName: name, location: location, remarks: remarks,

            }),
            success: function () {
                swal({
                    title: "SUCCESS",
                    text: "College Added Successfully",
                    icon: "success",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
                _GetColleges();


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
                }); GetColleges();
            },
            contentType: 'application/json'
        });
    }

    //edit

    function editCollege() {

        if (!$('#editCollegeForm')[0].checkValidity()) {
            $("#editsubmit-button").trigger("click");
            return
        }


        var collegeId = $("#editCollegeId").val();
        var name = $('#editname').val();
        var location = $('#editlocation').val();
        var remarks = $('#editremarks').val();

        console.log("name " + name + "topic " + location + "question " + remarks);
        $.ajax({
            type: "POST",
            url: 'http://localhost:5117/api/Colleges/UpdateCollege/',
            data: JSON.stringify({ collegeId: collegeId, collegeName: name, location: location, remarks: remarks }),
            success: function (data) {
                college._GetColleges();
                swal({
                    title: "SUCCESS",
                    text: "Value edited successfully !",
                    icon: "success",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
                var btn = $(".cl");
                btn.trigger('click');
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
                }); GetColleges();
            },
            contentType: 'application/json'
        });

    }



    return {
        _GetColleges: _GetColleges,
        _AddCollege: _AddCollege,
        editCollege: editCollege
    };

})();


$(document).ready(function () {
    college._GetColleges();
});

function AddCollege() {
    if (!$('#addCollegeForm')[0].checkValidity()) {
        $("#submit-button").trigger("click");
        return
    }
    college._AddCollege();
    var btn = $(".cl");
    btn.trigger('click');
}
function editCollege() {
    college.editCollege();
}

function showCollegeDetailsModal(data) {
    $('#collegeDetailsModal .modal-body').empty();
    $("#collegeContent").empty();
    console.log(data)

    // Create a modal element and add it to the DOM 
    var modal = $("<div>", {
        "class": "modal fade",
        "id": "collegeDetailsModal",
        "tabindex": "-1",
        "role": "dialog"
    }).appendTo("body");

    // Create the modal content using the evaluation data 
    var content = $("<div>", {
        "class": "modal-dialog modal-dialog-centered",
        "role": "document",
        "id": "collegeContent"
    }).appendTo("#collegeDetailsModal");

    $("<div>", {
        "class": "modal-content",
        "id": "collegeModalContent"
    }).appendTo("#collegeContent");

    $("<div>", {
        "class": "modal-header",
        "id": "college-modal-header"
    }).appendTo("#collegeModalContent");

    $("<h4>", {
        "class": "modal-title",
        "text": "College Details"
    }).appendTo("#college-modal-header");

    $("<button>", {
        "type": "button",
        "class": "close",
        "id": "collegeclose",
        "data-dismiss": "modal",
        "aria-label": "Close"
    }).appendTo("#college-modal-header");

    $("<span>", {
        "aria-hidden": "true",
        "html": "&times;"
    }).appendTo("#collegeclose");

    $("<div>", {
        "class": "modal-body",
        "id": "collegeModalBody"
    }).appendTo("#collegeModalContent");

    $("<p>", {
        "class": "para-headings",
        "html": "<span class='label-text'><b>College Name :</b></span> " + data.collegeName + "<br><span class='label-text'><b>Location :</b></span> " + data.location + "<br><span class='label-text'><b>Remarks :</b></span> " + data.remarks
    }).appendTo("#collegeModalBody");

    // Show the modal 
    $('#collegeDetailsModal').modal("show");
}


function showTraineeDetails(batchId) {
    console.log("kk");
    console.log(batchId);
    $.ajax({
        url: "http://localhost:5117/api/Colleges/GetTrainees?id=" + batchId,
        type: "POST",
        success: function (data) {
            console.log("success " + data
            );
            console.log(data);
            if (data.length > 0) {
                $('#traineeDetails  .modal-body').empty();
                $("#traineeDetailsContent").empty();
                // Create a modal element and add it to the DOM
                var modal = $("<div>", {
                    "class": "modal fade",
                    "id": "traineeDetails",
                    "tabindex": "-1",
                    "role": "dialog"
                }).appendTo("body");

                // Create the modal content using the batch data
                var content = $("<div>", {
                    "class": "modal-dialog modal-dialog-centered",
                    "role": "document",
                    "id": "traineeDetailsContent"
                }).appendTo("#traineeDetails");

                $("<div>", {
                    "class": "modal-content",
                    "id": "traineeModalContent"
                }).appendTo("#traineeDetailsContent");

                $("<div>", {
                    "class": "modal-header",
                    "id": "trainee-modal-header"
                }).appendTo("#traineeModalContent");

                $("<h4>", {
                    "class": "modal-title",
                    "text": "Trainees"
                }).appendTo("#trainee-modal-header");

                $("<button>", {
                    "type": "button",
                    "class": "close",
                    "id": "traineeclose",
                    "data-dismiss": "modal",
                    "aria-label": "Close"
                }).appendTo("#trainee-modal-header");

                $("<span>", {
                    "aria-hidden": "true",
                    "html": "&times;"
                }).appendTo("#traineeclose");

                $("<div>", {
                    "class": "modal-body",
                    "id": "traineeModalBody"
                }).appendTo("#traineeModalContent");

                data.forEach(function (dat) {
                    $("<hr>").appendTo("#traineeModalBody");
                    $("<div>", { "class": "form-group row" })
                        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": dat })))
                        .appendTo("#traineeModalBody");
                    $("<hr>").appendTo("#traineeModalBody");
                });

                // Show the modal
                $('#traineeDetails').modal("show");
            }
            else {
                swal({
                    title: "INFO ",
                    text: "No trainees found",
                    icon: "info",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // handle the error response
            console.log(" batch details Error: " + textStatus);
        }
    });
}

