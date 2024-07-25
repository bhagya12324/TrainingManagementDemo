//three async ajax calls for filling trainee table and filling two dropdowns

var validated = false;
$(document).ready(function () {

    LoadGrid.gridView();
});


var LoadGrid = (function () {
    console.log(localStorage.getItem('jwtToken'));
    function gridView() {
        $.ajax({
            url: "http://localhost:5117/api/Trainees/GetTrainees",
            headers: { "Authorization": 'bearer ' + localStorage.getItem('jwtToken') },
            dataType: "json",
            success: function (data) {
                $(".dataGridContainer").dxDataGrid({
                    dataSource: data,
                    columns: [
                        {
                            dataField: "traineeName",
                            caption: "Trainee Name",
                            width: 150,
                            cellTemplate: function (container, options) {
                                $("<div>")
                                    .addClass("devgrid-padding")
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
                                    showTraineeDetailsModal(options.data);
                                });
                            },
                            headerCellTemplate: function (header, info) {
                                $("<div>")
                                    .addClass("header-padding")
                                    .text(info.column.caption)
                                    .appendTo(header);
                            }
                        },
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
                            dataField: "traineeLocation",
                            caption: "Trainee Location",
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
                            dataField: "phone",
                            caption: "Phone Number",
                            width: 130,
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
                        //adding link for showing the corresponding trainee eval details
                        {

                            width: 140,
                            cellTemplate: function (container, options) {
                                $("<a>")
                                    .addClass("details-link")
                                    .text("View Evaluation")
                                    .on("click", function () {

                                        showEvalDetails(options.data.traineeId);
                                    })
                                    .appendTo(container);
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
                        console.log(record);
                        // Populate the form fields with the record data

                        $('#editTraineeId').val(record.traineeId);
                        $('#EditBatchId').val(record.batchId);
                        $('#EditdropdownMenuButton1').text(record.batchName)
                        $('#editcollegeId').val(record.collegeId)
                        $('#EditdropdownMenuButton').text(record.collegeName)
                        $('#EdittraineeName').val(record.traineeName)
                        $('#Editlocation').val(record.traineeLocation)
                        $('#Editemail').val(record.email)
                        $('#Editphone').val(record.phone)
                        // Show the Bootstrap modal sheet
                        $('#editModal').modal('show');
                        e.cancel = true;

                    }, filterRow:
                    {
                        visible: false,
                        applyFilter: "auto",
                        showOperationChooser: false
                    },
                    //this code will search for trainee names only
                    //onInitialized: function (e) {
                    //    $("#searchBox").keyup(function (){
                    //        var st = $(this).val();
                    //        e.component.filter(["Trainee Name", "contains", st]);
                    //    });
                    //},

                    
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
                    var dgi = $(".dataGridContainer").dxDataGrid("instance");
                    $("#searchBox").on("keyup", function () {
                        var st = $(this).val();
                        dgi.filter(function (data){
                            for (var column in data) {
                                if (data[column] .toString().toLowerCase().indexOf(st.toLowerCase()) !== -1) {
                                    return true;
                                }
                            }
                            return false;
                        });
                     });
                 });
                //combobox filling for colleges
                $.ajax({
                    url: "http://localhost:5117/api/Colleges/GetColleges",
                    headers: { "Authorization": 'bearer ' + localStorage.getItem('jwtToken') },
                    dataType: "json",
                    success: function (colleges) {
                        var dropdownMenu = $("#collegeDropdown-menu");
                        dropdownMenu.empty();
                        $.each(colleges, function (index, college) {
                            dropdownMenu.append(`<a class="dropdown-item college-Dropdown" href="#" value=${college.collegeId}>${college.collegeName}</a>`);
                        });

                        //edit combobox filling
                        var dropdownMenu = $("#editcollegeDropdown-menu");
                        dropdownMenu.empty();
                        $.each(colleges, function (index, college) {
                            dropdownMenu.append(`<a class="dropdown-item editcollege-Dropdown" href="#" value=${college.collegeId}>${college.collegeName}</a>`);
                        });

                        //combobox filling for batches
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
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
        });
    }
    return {
        gridView: gridView
    }
})();


    

//fnctuon to add trainee 
var addTraine = (function () {
    function addTrainee() {
        var collegeId = $("#collegeId").val();
        var batchId = $("#BatchId").val();
        console.log(batchId);
        var traineeName = $("#traineeName").val();
        var location = $("#location").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        console.log("Add Trainee")
        $.ajax({
            type: "POST",
            url: 'http://localhost:5117/api/Trainees/InsertTrainee',
            headers: { "Authorization": 'bearer ' + localStorage.getItem('jwtToken') },
            data: JSON.stringify({traineeId:1, collegeId: collegeId, batchId: batchId, traineeName: traineeName, traineeLocation: location, email: email,phone:phone ,discontinue:'NULL'}),

            success: function (data) {

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Trainee Added',
                    customClass: {
                        confirmButton: 'btn  btn-primary',
                    },
                });
                var btn = $(".cl");
                btn.trigger('click');
                btn.off('click');

            },
            error: function (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: error.statusText,
                    customClass: {
                        confirmButton: 'btn  btn-primary',
                    },
                });
                var btn = $(".cl");
                btn.trigger('click');
                btn.off('click');
            },
            contentType: "application/json",
        });
        LoadGrid.gridView();
    }

    return {
        addTrainee: addTrainee
    }
})();






//validation of displaying required field under textfields
$(document).ready(function () {


    //trainee name validator
    $('#traineeName').keyup(function () {
        // Get the value of the input field
        var traineename = $(this).val();
        var trimValue = $(this).val().trim();
        // Check if the input field is empty
        if (traineename == '' || trimValue === '') {
            // Display the "required" label
            $('#requiredLabel').show();
            validated = false;
        } else {
            // Hide the "required" label
            $('#requiredLabel').hide();
            validated = true;
        }
    });

    //batchname validator
    $('#traineeName').keyup(function () {
        // Get the value of the input field
        var batchId = $("#BatchId").val();
        console.log("sd"+batchId)
        // Check if the input field is empty
        if (batchId == ''  || typeof batchId === "undefined") {
            // Display the "required" label
            $('#requiredBatchId').show();
            validated = false;
        } else {
            // Hide the "required" label
            $('#requiredBatchId').hide();
            validated = true;
        }
    });

    // Email validator
    $('#email').keyup(function () {
        // Get the value of the input field
        var email = $(this).val();
        var trimValue = $(this).val().trim();
        // Check if the input field is empty
        if (email == '' ||  trimValue == '') {
            // Display the "required" label
            $('#emaillabel').show();
            validated = false;
        } else {
            // Hide the "required" label
            $('#emaillabel').hide();
            validated = true;
        }
    });

    // location validator
    $('#location').keyup(function () {
        // Get the value of the input field
        var location = $(this).val();
        console.log("location" + location)
        var trimValue = $(this).val().trim();
        // Check if the input field is empty
        if (location == '' ||  trimValue == '') {
            // Display the "required" label
            $('#locationlabel').show();
            validated = false;
        } else {
            // Hide the "required" label
            $('#locationlabel').hide();
            validated = true;
        }
    });
    // Phone validator
    $('#phone').keyup(function () {
        // Get the value of the input field
        var phone = $(this).val();
        var trimValue = $(this).val().trim();
        // Check if the input field is empty
        if (phone == '' || trimValue == '') {
            // Display the "required" label
            $('#phonelabel').show();
            validated = false;
        } else {
            // Hide the "required" label
            $('#phonelabel').hide();
            validated = true;
        }


     
    });
});
$(document).on("click", "#addButton", function () {
    console.log("hi");
    var formValid = $("#addTraineeForm")[0].checkValidity();
    if (!formValid) {
        console.log("invalid")
        var btn = $("#submitButton");
        btn.trigger('click');
        return
    }
    console.log("hello");
    addTraine.addTrainee();

});


//IIFE to edit Trainee
var EditTrainee = (function () {

    function editTrainee() {

        var traineeId = $('#editTraineeId').val();
        var batchId = $('#EditBatchId').val();
        var collegeId = $('#editcollegeId').val();
        var traineeName = $('#EdittraineeName').val();
        var location= $('#Editlocation').val();
        var email = $('#Editemail').val();
        var phone = $('#Editphone').val();
        var val = Validate();


        if (val.isValid == true) {
            console.log("trainee id" + traineeId + "batch iD" + batchId + "College Id" + collegeId + "trainee name" + traineeName + "location" + location + "email" + email + "phone" + phone)
            $.ajax({
                type: "POST",
                url: 'http://localhost:5117/api/Trainees/EditTrainee',
                headers: { "Authorization": 'bearer ' + localStorage.getItem('jwtToken') },
                data: JSON.stringify({ traineeId: traineeId, collegeId: collegeId, batchId: batchId, traineeName: traineeName, traineeLocation: location, email: email, phone: phone, discontinue: 'NULL' }),

                success: function (data) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Trainee Edited',
                        customClass: {
                            confirmButton: 'btn  btn-primary',
                        },
                    });
                    var btn = $(".cl");
                    btn.trigger('click');
                    btn.off('click');
                    LoadGrid.gridView();

                },
                error: function (error) {
                    Swal.fire({
                        icon: 'errpr',
                        title: 'ERROR',
                        text: error,
                        customClass: {
                            confirmButton: 'btn  btn-primary',
                        },
                    });
                    var btn = $(".cl");
                    btn.trigger('click');
                    btn.off('click');
                },
                contentType: "application/json",
            });
        }

        else {
            Swal.fire({
                icon: 'error',
                title: ' '+val.field+'field is requied',
                customClass: {
                    confirmButton: 'btn  btn-primary',
                },
            });
        }
        
    }

    return {
        editTrainee: editTrainee
    }
})();

//function to edit Trainee on Save button click



$(document).on("click", ".editTraineeButton", function () {
    console.log("Edit Button save")
    EditTrainee.editTrainee();

});

//functin after clikig college dropdown
$(document).on("click", ".college-Dropdown", function () {
    //console.log(this)

    //console.log(this.value)

    var selectedItem = $(this).attr("value");
    $("#collegeId").val(selectedItem);
    var selectedText = $(this).text();
    $("#dropdownMenuButton").text(selectedText);

    
});

//functin after clikig batches dropdown
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

//edit batches dropdown click

$(document).on("click", ".editbatches-Dropdown", function () {

    console.log("edit batch")

    var selectedItem = $(this).attr("value");
    console.log("batch id" + selectedItem)
    $("#EditBatchId").val(selectedItem);
    var selectedText = $(this).text();
    $("#EditdropdownMenuButton1").text(selectedText);
});

//edit colleges dropdown click
$(document).on("click", ".editcollege-Dropdown", function () {

    var selectedItem = $(this).attr("value");
    $("#editcollegeId").val(selectedItem);
    //// Check if the input field is empty
    //if (batchId == '') {
    //    // Display the "required" label
    //    $('#requiredBatchId').show();
    //} else {
    //    // Hide the "required" label
    //    $('#requiredBatchId').hide();
    //}
    var selectedText = $(this).text();
    $("#EditdropdownMenuButton").text(selectedText);
});


//Modal Sheet for Trainees
function showTraineeDetailsModal(data) {
    $('#traineeDetailsModal  .modal-body').empty();
    $("#traineeContent").empty();
    console.log(data)
    // Create a modal element and add it to the DOM
    var modal = $("<div>", {
        "class": "modal fade",
        "id":"traineeDetailsModal",
        "tabindex": "-1",
        "role": "dialog"
    }).appendTo("body");

    // Create the modal content using the trainee data
    var content = $("<div>", {
        "class": "modal-dialog",
        "role": "document",
        "id":"traineeContent"
    }).appendTo("#traineeDetailsModal");

    $("<div>", {
        "class": "modal-content",
        "id":"traineeModalContent"
    }).appendTo("#traineeContent");

    $("<div>", {
        "class": "modal-header",
        "id":"trainee-modal-header"
    }).appendTo("#traineeModalContent");

    $("<h4>", {
        "class": "modal-title",
        "text": "Trainee Details"
    }).appendTo("#trainee-modal-header");

    $("<button>", {
        "type": "button",
        "class": "close",
        "id":"traineeclose",
        "data-dismiss": "modal",
        "aria-label": "Close"
    }).appendTo("#trainee-modal-header");

    $("<span>", {
        "aria-hidden": "true",
        "html": "&times;"
    }).appendTo("#traineeclose");

    $("<div>", {
        "class": "modal-body",
        "id":"traineeModalBody"
    }).appendTo("#traineeModalContent");

    $("<p>", {
        "text": "Trainee Name : " + data.traineeName
    }).appendTo("#traineeModalBody");

    $("<p>", {
        "class":"para-headings",
        "text": "Batch Name : " + data.batchName
    }).appendTo("#traineeModalBody");

    $("<p>", {
        "text": "College Name : " + data.collegeName
    }).appendTo("#traineeModalBody");

    $("<p>", {
        "text": "Trainee Location : " + data.traineeLocation
    }).appendTo("#traineeModalBody");

    $("<p>", {
        "text": "Email Id : " + data.email
    }).appendTo("#traineeModalBody");
    
    $("<p>", {
        "text": "Phone Number : " + data.phone
    }).appendTo("#traineeModalBody");

    // Show the modal
    $('#traineeDetailsModal').modal("show");
}


//function to check validity

function Validate() {

    var trimTraineeId = $('#editTraineeId').val().trim();

    var trimBatchId = $('#EditBatchId').val().trim();

    var trimCollegeId = $('#editcollegeId').val().trim();

    var trimTraineeName = $('#EdittraineeName').val().trim();

    var trimLocation = $('#Editlocation').val().trim();

    var trimEmail = $('#Editemail').val().trim();

    var trimPhone = $('#Editphone').val().trim();

    if (trimEmail == '') {
        return {
            "isValid": false,
            "field":"Email"
        };
    }
    else if (trimPhone == '') {
        return {
            "isValid": false,
            "field": "Phone"
        };
    }
    else if (trimTraineeId == '') {
        return {
            "isValid": false,
            "field": "TraineeId"
        };
    }
    else if (trimBatchId == '') {
        return {
            "isValid": false,
            "field": "BatchId"
        };
    }
    else if (trimCollegeId == '') {
        return {
            "isValid": false,
            "field": "CollegeId"
        };
    }
    else if (trimTraineeName == '') {
        return {
            "isValid": false,
            "field": "Trainee Name"
        };
    }
    else if (trimLocation == '') {
        return {
            "isValid": false,
            "field": "Location"
        };
    }
    return {
        "isValid": true,
        
    };
}

function showEvalDetails(traineeId) {
    console.log(traineeId)
    $.ajax({
        url: "http://localhost:5117/api/TraineeEvaluations/getTraineeEval?id=" + traineeId,
        type: "POST",
        success: function (data) {
            console.log("success "+JSON.stringify(data));
            traineeEvaldata = JSON.stringify(data);

            // Parse the JSON data in the traineeEval variable
            var evalData = JSON.parse(traineeEvaldata);
            if (evalData.length > 0) {

                $('#exampleModalLong  .modal-body').empty();
                $("#batchDetailsContent").empty();

                // Create a modal element and add it to the DOM
                var modal = $("<div>", {
                    "class": "modal fade",
                    "id": "exampleModalLong",
                    "tabindex": "-1",
                    "role": "dialog"
                }).appendTo("body");

                // Create the modal content using the batch data
                var content = $("<div>", {
                    "class": "modal-dialog",
                    "role": "document",
                    "id": "batchDetailsContent"
                }).appendTo("#exampleModalLong");

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
                    "text": "Evaluation Details"
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

                // Iterate over each object in the array using the forEach() method
                evalData.forEach(function (item) {
                    console.log("" + item.evaluationName + "");

                    $("<div>", { "class": "form-group row" })
                        .append($("<label>", { "class": "col-sm-4 col-form-label  label-colon font-weight-bold", "text": "Evaluation Name : " }))
                        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": item.evaluationName })))
                        .appendTo("#batchDetailBody");


                    $("<div>", { "class": "form-group row" })
                        .append($("<label>", { "class": "col-sm-4 col-form-label font-weight-bold", "text": "Question : " }))
                        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": item.question })))
                        .appendTo("#batchDetailBody");


                    $("<div>", { "class": "form-group row" })
                        .append($("<label>", { "class": "col-sm-4 col-form-label font-weight-bold", "text": "Date : " }))
                        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": item.date })))
                        .appendTo("#batchDetailBody");

                    $("<div>", { "class": "form-group row" })
                        .append($("<label>", { "class": "col-sm-4 col-form-label font-weight-bold", "text": "Score : " }))
                        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": item.score })))
                        .appendTo("#batchDetailBody");

                    $("<div>", { "class": "form-group row" })
                        .append($("<label>", { "class": "col-sm-4 col-form-label font-weight-bold", "text": "Remarks : " }))
                        .append($("<div>", { "class": "col-sm-8" }).append($("<span>", { "class": "form-control-plaintext", "text": item.remarks })))
                        .appendTo("#batchDetailBody");

                    $("<hr>").appendTo("#batchDetailBody");



                });

                // Show the modal
                $('#exampleModalLong').modal("show");
            }
            else {
                swal.fire({
                    title: "INFO ",
                    text: "No evaluation details found",
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





