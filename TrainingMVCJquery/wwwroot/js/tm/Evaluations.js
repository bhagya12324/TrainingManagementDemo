$(document).ready(function () {
    Datagrid._GetEvaluations();
});
var currentbatchId;
var Datagrid = (function () {
    function _GetEvaluations() {
        //function to show the evaluation table
        $.ajax({
            url: "http://localhost:5117/api/Evaluations/GetEvaluations/",
            dataType: "json",
            success: function (data) {
                console.log("success triggered");
                console.log($("#card-container"))
                var grid = $("#card-container").dxDataGrid({
                    dataSource: data,
                    columns: [

                        {
                            dataField: "batchName",
                            caption: "Batch Name",
                            width: 150,
                            cellTemplate: function (container, options) {
                                $("<div>")
                                    .addClass("devgrid-padding")
                                    .text(options.value)
                                    .appendTo(container);
                            }
                            ,

                            alignment: "center",
                            cellTemplate: function (container, options) {

                                $("<a>", {
                                    "style": "color:black;",
                                    "href": "javascript:void(0)",
                                    "text": options.text
                                }).appendTo(container).on("click", function () {
                                    showEvaluationDetailsModal(options.data);
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
                            dataField: "evaluationName",
                            caption: "Evaluation Name",
                            width: 150,
                            cellTemplate: function (container, options) {
                                $("<div>")
                                    .addClass("cell-padding")
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
                            dataField: "date",
                            caption: "Date",

                            width: 100, cellTemplate: function (container, options) {
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
                            dataField: "topic",
                            caption: "Topic",
                            width: 150, cellTemplate: function (container, options) {
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
                            dataField: "question",
                            caption: "Question",
                            width: 150, cellTemplate: function (container, options) {
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
                            dataField: "description",
                            caption: "Description",
                            width: 150, cellTemplate: function (container, options) {
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
                        editEvaluationId = record.evaluationId;
                        var dateString = record.date;
                        /* Format the date as yyyy-mm-dd*/
                        var date = new Date(dateString);
                        var formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                        // Populate the form fields with the record data
                        $('#evaluationIdEdit').val(record.batchName);
                        //$('#editModal input[name="lastName"]').val(record.lastName);
                        console.log("bbbnmmn", record.batchId);
                        $('#EditBatchId').val(record.batchId);
                        $('#editdropdownMenuButton1').text(record.batchName)
                        $('#editname').val(record.evaluationName);
                        $('#editdate').val(formattedDate);
                        $('#edittopic').val(record.topic);
                        $('#editquestion').val(record.question);
                        $('#editdescription').val(record.description);

                        // Show the Bootstrap modal sheet
                        
                        e.cancel = true;

                    }, filterRow:
                    {
                        visible: false,
                        showOperationChooser: false,
                        
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

                //combobox filling for Batches 
                $.ajax({
                    url: "http://localhost:5117/api/Batches/GetBatches",
                    dataType: "json",
                    success: function (response) {
                        //combobox add
                        var dropdownMenu = $("#batchesDropdown-menu");
                        dropdownMenu.empty();
                        $.each(response, function (index, item) {
                            dropdownMenu.append(`<a class="dropdown-item batches-Dropdown" href="#" value=${item.batchId}>${item.batchName}</a>`);
                        });

                        //combobox edit
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
                console.log("error", error);
            }
        });



    }
    return {
        _GetEvaluations: _GetEvaluations
    }
})();



$(document).on("click", ".batches-Dropdown", function () {

    console.log("batches clicked")
    //console.log(this)

    //console.log(this.value)
    var batchId = $("#BatchId").val();
    console.log("sd" + batchId)

    var selectedItem = $(this).attr("value");
    console.log("batch id" + selectedItem)
    $("#BatchId").val(selectedItem);
    // Check if the input field is empty
    if (batchId == '') {
        // Display the "required" label
        $('#requiredBatchId').show();
    } else {
        // Hide the "required" label
        $('#requiredBatchId').hide();
    }
    var selectedText = $(this).text();
    $("#dropdownMenuButton1").text(selectedText);


});

$(document).on("click", ".editbatches-Dropdown", function () {

    console.log("batches clicked")
    var batchId = $("#BatchId").val();
    console.log("sd" + batchId)

    var selectedItem = $(this).attr("value");
    console.log("batch id" + selectedItem)
    $("#BatchId").val(selectedItem);
    // Check if the input field is empty
    if (batchId == '') {
        // Display the "required" label
        $('#requiredBatchId').show();
    } else {
        // Hide the "required" label
        $('#requiredBatchId').hide();
    }
    var selectedText = $(this).text();
    $("#editdropdownMenuButton1").text(selectedText);


});
//IIFE for Saving Details of Evaluation
var evaluation = (function () {

    function _AddEvaluation() {
        if (!$('#addEvaluationForm')[0].checkValidity()) {
            $("#submit-button").trigger("click");
            return
        }

        var batchId = $("#BatchId").val();
        var name = $("#name").val();
        var date = $("#date").val();
        var topic = $("#topic").val();
        var question = $("#question").val();
        var description = $("#description").val();


        if (name.length < 1 || topic.length < 1 || question.length < 1) {
            swal({
                title: "ERROR ",
                text: " Insertion Failed!!Fields cannot be empty.",
                icon: "warning",
                button: {
                    text: "OK",
                    className: "btn-primary",
                },
            });
            return

        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:5117/api/Evaluations/InsertEvaluation/',
            data: JSON.stringify({
                evaluationId: 1, batchId: batchId, evaluationName: name, date: date, topic: topic, question: question, description: description

            }),
            success: function () {
                Datagrid._GetEvaluations();

                swal({
                    title: "SUCCESS",
                    text: "Evaluation Added Successfully",
                    icon: "success",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
                var btn = $(".cl");
                btn.trigger('click');


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
            },
            contentType: 'application/json'
        });

    }


    //function for update evaluation
    

    function editEvaluation() {

        if (!$('#editEvaluationForm')[0].checkValidity()) {
            $("#editsubmit-button").trigger("click");
            return
        }

        var batches = $("#batchesDropdown-menu").children();
        $.each(batches, function (index, item) {
            if (item.innerHTML == $('#editdropdownMenuButton1').text()) {
                $("#updatebatchId").val(item.getAttribute("value"));

            }
        });

        $(document).on("click", ".editbatches-Dropdown", function () {
            $("#updatebatchId").val($(this).attr("value"));
        });
        var batchId = $("#updatebatchId").val();
        var name = $('#editname').val();
        var date = $('#editdate').val();
        var topic = $('#edittopic').val();
        var question = $('#editquestion').val();
        var description = $('#editdescription').val();

        console.log("editid" + editEvaluationId + "batchid" + batchId +  "name " + name + "date " + date + "topic " + topic + "question " + question + "descripton " + description)
        $.ajax({
            type: "POST",
            url: 'http://localhost:5117/api/Evaluations/UpdateEvaluation/',
            data: JSON.stringify({ evaluationId:editEvaluationId,batchId: batchId, evaluationName: name, date: date, topic: topic, question: question, description: description }),
            success: function (data) {
                Datagrid._GetEvaluations();
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
                $("#updatebatchId").val("");
            },
            error: function (error) {
                swal({
                    title: "ERROR " + error.status,
                    text: error.statusText + " Editing Failed!! Try Again",
                    icon: "error",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
            },
            contentType: "application/json",
        });
       
    }
    return {
        _AddEvaluation: _AddEvaluation,
        editEvaluation: editEvaluation
    }
})();



//save button click
$(document).on("click", ".saveButton", function () {

    evaluation._AddEvaluation();
});
//edit save button
$(document).on("click", ".editEvaluationButton", function () {

    evaluation.editEvaluation();
});


function showEvaluationDetailsModal(data) {
    $('#evaluationDetailsModal .modal-body').empty();
    $("#evaluationContent").empty();
    console.log(data)

    // Create a modal element and add it to the DOM
    var modal = $("<div>", {
        "class": "modal fade",
        "id": "evaluationDetailsModal",
        "tabindex": "-1",
        "role": "dialog"
    }).appendTo("body");

    // Create the modal content using the evaluation data
    var content = $("<div>", {
        "class": "modal-dialog modal-dialog-centered",
        "role": "document",
        "id": "evaluationContent"
    }).appendTo("#evaluationDetailsModal");

    $("<div>", {
        "class": "modal-content",
        "id": "evaluationModalContent"
    }).appendTo("#evaluationContent");

    $("<div>", {
        "class": "modal-header",
        "id": "evaluation-modal-header"
    }).appendTo("#evaluationModalContent");

    $("<h4>", {
        "class": "modal-title",
        "text": "Evaluation Details"
    }).appendTo("#evaluation-modal-header");

    $("<button>", {
        "type": "button",
        "class": "close",
        "id": "evaluationclose",
        "data-dismiss": "modal",
        "aria-label": "Close"
    }).appendTo("#evaluation-modal-header");

    $("<span>", {
        "aria-hidden": "true",
        "html": "&times;"
    }).appendTo("#evaluationclose");

    $("<div>", {
        "class": "modal-body",
        "id": "evaluationModalBody"
    }).appendTo("#evaluationModalContent");

    $("<p>", {
        "class": "para-headings",
        "html": "<span class='label-text'><b>Batch Name :</b></span> &nbsp; " + data.batchName + "<br><span class='label-text'><b>Evaluation Name :</b></span> &nbsp; "
            + data.evaluationName + "<br><span class='label-text'><b>Date :</b></span> &nbsp; "
            + data.date + "<br><span class='label-text'><b>Topic :</b></span> &nbsp; "
            + data.topic + "<br><span class='label-text'><b>Question :</b></span> &nbsp; " + data.question + "<br><span class='label-text'><b>Description :</b></span> &nbsp; " + data.description
    }).appendTo("#evaluationModalBody");
   



    // Show the modal
    $('#evaluationDetailsModal').modal("show");
}
