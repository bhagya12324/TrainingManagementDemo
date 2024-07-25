$(document).ready(function () {
    Datagrid._GetTraineeEvaluations();
});
var currentbatchId;
var Datagrid = (function () {
    console.log("traineeevaluations");
    function _GetTraineeEvaluations() {
        //function to show the evaluation table
        $.ajax({
            url: "http://localhost:5117/api/TraineeEvaluations/GetTraineeEvaluations/",
            dataType: "json",
            success: function (data) {
                console.log("success triggered");
                console.log($("#card-container"))
                var grid = $("#card-container").dxDataGrid({
                    dataSource: data,
                    columns: [


                        {
                            dataField: "traineeName",
                            caption: "Trainee Name",
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
                            },
                            alignment: "center",
                            cellTemplate: function (container, options) {

                                $("<a>", {
                                    "style": "color:black;",
                                    "href": "javascript:void(0)",
                                    "text": options.text
                                }).appendTo(container).on("click", function () {
                                    showTraineeEvaluationDetailsModal(options.data);
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
                            caption: "Evaluation  Name",
                            width: 150,
                            cellTemplate: function (container, options) {
                                $("<div>")
                                    .addClass("devgrid-padding")
                                    .text(options.value)
                                    .appendTo(container);
                            }
                        }
                            ,

                            
                        
                        {
                            dataField: "score",
                            caption: "Score",

                            width: 100
                            //cellTemplate: function (container, options) {
                            //    $("<div>")
                            //        .addClass("devgrid-padding")
                            //        .text(options.value)
                            //        .appendTo(container);
                            //},

                            //headerCellTemplate: function (header, info) {
                            //    $("<div>")
                            //        .addClass("header-padding")
                            //        .text(info.column.caption)
                            //        .appendTo(header);
                            //}





                        },
                        {
                            dataField: "remarks",
                            caption: "Remarks",
                            width: 150
                            //cellTemplate: function (container, options) {
                            //    $("<div>")
                            //        .addClass("devgrid-padding")
                            //        .text(options.value)
                            //        .appendTo(container);
                            //},

                            //headerCellTemplate: function (header, info) {
                            //    $("<div>")
                            //        .addClass("header-padding")
                            //        .text(info.column.caption)
                            //        .appendTo(header);
                            //}




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

                        /*$('#editModal').modal('show');*/
                        var record = e.data;
                        console.log(record);
                        // Populate the form fields with the record data

                        $('#editTraineeEvaluationId').val(record.traineeEvaluationId);
                        console.log("vvvvvvvv", record.traineeEvaluationId);

                        
                        $('#EditTraineeId').val(record.traineeId);
                        $('#EditdropdownMenuButton1').text(record.traineeName)
                        $('#editEvaluationId').val(record.evaluationId)
                        $('#EditdropdownMenuButton').text(record.evaluationName)
                        $('#editScore').val(record.score)
                        $('#editRemarks').val(record.remarks)
                        console.log("Evaluationid-------", record.evaluationId);
                        console.log("TraineeId -------", record.traineeId);
                        // Show the Bootstrap modal sheet
                        $('#editModal').modal('show');
                        e.cancel = true;

                    }, 
                    filterRow:
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
                                if (data[column].toString().toLowerCase().indexOf(st.toLowerCase()) !== -1) {
                                    return true;
                                }
                            }
                            return false;
                        });
                    });
                });

                //combobox filling for Evaluations
                $.ajax({
                    url: "http://localhost:5117/api/Evaluations/GetEvaluations",
                    dataType: "json",
                    success: function (response) {
                        //combobox add
                        var dropdownMenu = $("#evaluationsDropdown-menu");
                        dropdownMenu.empty();
                        $.each(response, function (index, item) {
                            dropdownMenu.append(`<a class="dropdown-item traineeEvaluations-Dropdown" href="#" value=${item.evaluationId}>${item.evaluationName}</a>`);
                        });

                        
                        //combobox edit
                        var dropdownMenu = $("#editEvaluationsDropdown-menu");
                        dropdownMenu.empty();
                        $.each(response, function (index, item) {
                            dropdownMenu.append(`<a class="dropdown-item editEvaluations-Dropdown" href="#" value=${item.evaluationId}>${item.evaluationName}</a>`);
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });

                $.ajax({
                    url: "http://localhost:5117/api/Trainees/GetTrainees",
                    dataType: "json",
                    success: function (response) {
                        //combobox add
                        var dropdownMenu = $("#traineesDropdown-menu");
                        dropdownMenu.empty();
                        $.each(response, function (index, item) {
                            dropdownMenu.append(`<a class="dropdown-item trainees-Dropdown" href="#" value=${item.traineeId}>${item.traineeName}</a>`);
                        });
                        //combobox edit
                        var dropdownMenu = $("#editTraineesDropdown-menu");
                        dropdownMenu.empty();
                        $.each(response, function (index, item) {
                            dropdownMenu.append(`<a class="dropdown-item editTrainees-Dropdown" href="#" value=${item.traineeId}>${item.traineeName}</a>`);
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
        _GetTraineeEvaluations: _GetTraineeEvaluations
    }
})();

$(document).on("click", ".trainees-Dropdown", function () {

    console.log("trainees clicked")
    //console.log(this)

    //console.log(this.value)
    var traineesId = $("#TraineesId").val();
    console.log("s" + traineesId);

    var selectedItem = $(this).attr("value");
    console.log("trainees id" + selectedItem)
    $("#TraineesId").val(selectedItem);
    // Check if the input field is empty
    if (traineesId == '') {
        // Display the "required" label
        $('#requiredBatchId').show();
    } else {
        // Hide the "required" label
        $('#requiredBatchId').hide();
    }
    var selectedText = $(this).text();
    $("#traineedropdownMenuButton").text(selectedText);


});

$(document).on("click", ".editTrainees-Dropdown", function () {

    console.log("trainees clicked")
    //console.log(this)

    //console.log(this.value)
    var traineesId = $("#EditTraineeId").val();
    console.log("s" + traineesId);

    var selectedItem = $(this).attr("value");
    console.log("trainees id" + selectedItem)
    $("#EditTraineeId").val(selectedItem);
    // Check if the input field is empty
    if (traineesId == '') {
        // Display the "required" label
        $('#requiredBatchId').show();
    } else {
        // Hide the "required" label
        $('#requiredBatchId').hide();
    }
    var selectedText = $(this).text();
    $("#EditdropdownMenuButton1").text(selectedText);


});

$(document).on("click", ".evaluations-Dropdown", function () {

    console.log("traineeevaluations clicked")
    //console.log(this)

    //console.log(this.value)
    var evaluationId = $("#EvaluationId").val();
    console.log("s" + evaluationId);

    var selectedItem = $(this).attr("value");
    console.log("evaluation id : " + selectedItem)
    $("#EvaluationId").val(selectedItem);
    // Check if the input field is empty
    if (evaluationId == '') {
        // Display the "required" label
        $('#requiredBatchId').show();
    } else {
        // Hide the "required" label
        $('#requiredBatchId').hide();
    }
    var selectedText = $(this).text();
    $("#dropdownMenuButton1").text(selectedText);


});

$(document).on("click", ".editEvaluations-Dropdown", function () {

    console.log("traineeevaluations clicked")
    //console.log(this)

    //console.log(this.value)
    var evaluationId = $("#editEvaluationId").val();
    console.log("s" + evaluationId);

    var selectedItem = $(this).attr("value");
    console.log("evaluation id : " + selectedItem)
    $("#editEvaluationId").val(selectedItem);
    // Check if the input field is empty
    if (evaluationId == '') {
        // Display the "required" label
        $('#requiredBatchId').show();
    } else {
        // Hide the "required" label
        $('#requiredBatchId').hide();
    }
    var selectedText = $(this).text();
    $("#EditdropdownMenuButton").text(selectedText);


});




//IIFE for Saving Details of Evaluation
var traineeevaluation = (function () {

    function _AddTraineeEvaluation() {
        if (!$('#addTraineeEvaluationForm')[0].checkValidity()) {
            $("#submit-button").trigger("click");
            return
        }
        var traineeId = $("#TraineesId").val();
        var evaluationId = $("#EvaluationId").val();
        /*var name = $("#name").val();*/
        var score = $("#score").val();
        var remarks = $("#remarks").val();



        if (score.length < 1) {
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

        console.log("TRAINEE ID :::: ", traineeId);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5117/api/TraineeEvaluations/InsertTraineeEvaluation/',
            data: JSON.stringify({
                traineeEvaluationId: 1, evaluationId: evaluationId, traineeId: traineeId, score: score, remarks: remarks

            }),
            success: function () {
                Datagrid._GetTraineeEvaluations();

                swal({
                    title: "SUCCESS",
                    text: "Score Added Successfully",
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


    function editTraineeEvaluation() {

        if (!$('#editTraineeEvaluationForm')[0].checkValidity()) {
            $("#editsubmit-button").trigger("click");
            return
        }

        var traineeEvaluationId = $('#editTraineeEvaluationId').val();
        var traineeId = $('#EditTraineeId').val();
        var evaluationId = $('#editEvaluationId').val();
        var score = $('#editScore').val();
        var remarks = $('#editRemarks').val();
       /* var val = Validate();*/


        //if (val.isValid == true) {
        console.log(" traineeevaluation id:::" + traineeEvaluationId + " EditTraineeId " + traineeId + " editEvaluationId " + evaluationId +
        " editScore" + score + " editRemarks" + remarks );
            $.ajax({
                type: "POST",
                url: 'http://localhost:5117/api/TraineeEvaluations/UpdateTraineeEvaluation',
                /*headers: { "Authorization": 'bearer ' + localStorage.getItem('jwtToken') },*/
                data: JSON.stringify({ traineeEvaluationId: traineeEvaluationId, traineeId: traineeId, evaluationId: evaluationId, score: score, remarks: remarks }),

                success: function (data) {
                    Datagrid._GetTraineeEvaluations();
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
                   /* $("#updatebatchId").val("");*/
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
            _AddTraineeEvaluation: _AddTraineeEvaluation,
            editTraineeEvaluation: editTraineeEvaluation
        }
    }) ();



//save button click
$(document).on("click", ".saveButton", function () {

    traineeevaluation ._AddTraineeEvaluation();
});
//edit save button
$(document).on("click", ".editTraineeEvaluationButton", function () {

    traineeevaluation.editTraineeEvaluation();
});


function showTraineeEvaluationDetailsModal(data) {
    $('#traineeevaluationDetailsModal .modal-body').empty();
    $("#traineeevaluationContent").empty();
    console.log(data)

    // Create a modal element and add it to the DOM
    var modal = $("<div>", {
        "class": "modal fade",
        "id": "traineeevaluationDetailsModal",
        "tabindex": "-1",
        "role": "dialog"
    }).appendTo("body");

    // Create the modal content using the evaluation data
    var content = $("<div>", {
        "class": "modal-dialog modal-dialog-centered",
        "role": "document",
        "id": "traineeevaluationContent"
    }).appendTo("#traineeevaluationDetailsModal");

    $("<div>", {
        "class": "modal-content",
        "id": "traineeevaluationModalContent"
    }).appendTo("#traineeevaluationContent");

    $("<div>", {
        "class": "modal-header",
        "id": "traineeevaluation-modal-header"
    }).appendTo("#traineeevaluationModalContent");

    $("<h4>", {
        "class": "modal-title",
        "text": "Trainee Evaluation Details"
    }).appendTo("#traineeevaluation-modal-header");

    $("<button>", {
        "type": "button",
        "class": "close",
        "id": "traineeevaluationclose",
        "data-dismiss": "modal",
        "aria-label": "Close"
    }).appendTo("#traineeevaluation-modal-header");

    $("<span>", {
        "aria-hidden": "true",
        "html": "&times;"
    }).appendTo("#traineeevaluationclose");

    $("<div>", {
        "class": "modal-body",
        "id": "traineeevaluationModalBody"
    }).appendTo("#traineeevaluationModalContent");

    $("<p>", {
        "class": "para-headings",
        "html": "<span class='label-text'><b>Trainee Name :</b></span> &nbsp; " + data.traineeName + "<br><span class='label-text'><b>Evaluation Name :</b></span> &nbsp; "
            + data.evaluationName + "<br><span class='label-text'><b>Score :</b></span> &nbsp; "
            + data.score + "<br><span class='label-text'><b>Remarks :</b></span> &nbsp; "
            + data.remarks 
    }).appendTo("#traineeevaluationModalBody");




    // Show the modal
    $('#traineeevaluationDetailsModal').modal("show");
}

