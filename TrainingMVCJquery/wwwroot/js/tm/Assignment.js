
var as = (function () {

    function _GetAssignments() {
        $.ajax({
            url: "http://localhost:5117/api/TraineeAssignment/GetTraineeAssignments",
            dataType: "json",
            success: function (data) {
                $("#assignment-container").dxDataGrid({
                    
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
                        $('#editassignmentId').val(record.assignmentId);
                        $('#editassignment').val(record.assignment);
                        $('#editstatus').val(record.status);
                        $('#editscore').val(record.score);
                        $('#editremarks').val(record.remarks);

                        // Show the Bootstrap modal sheet
                        $('#editAssignmentModal').modal('show');

                        e.cancel = true;

                        
                    },
                    columns: [
                        {
                            dataField: "traineeName",
                            caption: "Trainee Name",
                            width: 200

                        },
                        {
                            dataField: "assignment",
                            caption: " Assignment",
                            width: 200

                        },
                        {
                            dataField: "status",
                            caption: " Status",
                            width: 200

                        },
                        {
                            dataField: "score",
                            caption: "Score",
                            width: 150

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

                //searching for all columns in the table
                $(function () {
                    var dgi = $("#assignment-container").dxDataGrid("instance");
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
                    url: "http://localhost:5117/api/Trainees/GetTrainees",
                    dataType: "json",
                    success: function (trainees) {
                        var dropdownMenu = $("#assignment-menu");
                        dropdownMenu.empty();
                        $.each(trainees, function (index, trainee) {
                            dropdownMenu.append(`<a class="dropdown-item assignment-Dropdown" href="#" value=${trainee.traineeId}>${trainee.traineeName}</a>`);
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });

                $('#assignment-menu').on('change', function ()
                {
                    var selectedValue = $(this).val(); // Get the selected value
                    console.log('Selected value: ' + selectedValue);
                });

            }
        });
    }

    function _AddAssignment()
    {
        if (!$('#addAssignmentForm')[0].checkValidity()) {
            $("#submit-button").trigger("click");
            return
        }
        var traineeId = $("#traineeId").val();
        var assignment = $("#assignment").val();
        var score = $("#score").val();
        var status = $("#status").val();
        var remarks = $("#remarks").val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:5117/api/TraineeAssignment/AddTraineeAssignment',
            data: JSON.stringify({
                assignmentId: 1, traineeId: traineeId,  assignment: assignment, status: status, score: score, remarks: remarks
            }),
            contentType: 'application/json',
            success: function () {


                swal({
                    title: "SUCCESS",
                    text: "Assignment Added Successfully",
                    icon: "success",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
                var btn = $(".cl");
                btn.trigger('click');
                GetAssignments();
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
                GetAssignments();
                
            }
        });
    }
    function _UpdateAssignment()
    //req field validation during form submission
        {
        if (!$('#updateAssignmentForm')[0].checkValidity()) {
            $("#sub").trigger("click");
            return
        }
        var editassignmentId= $('#editassignmentId').val();
        var editassignment= $('#editassignment').val()
        var editstatus = $('#editstatus').val()
        var editscore= $('#editscore').val()
        var editremarks=$('#editremarks').val()
        console.log(editstatus);

        $.ajax({
            type: 'POST',
            url: 'http://localhost:5117/api/TraineeAssignment/UpdateTraineeAssignment',
            data: JSON.stringify({
                assignmentId: editassignmentId, assignment: editassignment, status: editstatus, score: editscore, remarks: editremarks
            }),
            contentType: 'application/json',
            success: function () {


                swal({
                    title: "SUCCESS",
                    text: "Assignment updated Successfully",
                    icon: "success",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
                var btn = $(".cl");
                btn.trigger('click');
                GetAssignments();



            },
            error: function (error) {
                console.log(error);
                swal({
                    title: "ERROR " ,
                    text:  " updation Failed!! Try Again",
                    icon: "error",
                    button: {
                        text: "OK",
                        className: "btn-primary",
                    },
                });
                GetAssignments();

            }
        });
    }

    return {
        _GetAssignments: _GetAssignments,
        _AddAssignment: _AddAssignment,
        _UpdateAssignment:_UpdateAssignment


    };
  

})();


$(document).on("click", ".assignment-Dropdown", function () {
    var selectedItem = $(this).attr("value");
    $("#traineeId").val(selectedItem);
    var selectedText = $(this).text();
    console.log(selectedItem);
    console.log(selectedText);

    $("#dropdownMenuButton").text(selectedText);


});


$(document).ready(function () {
    as._GetAssignments();
});

function GetAssignments() {
    as._GetAssignments()
}

function AddAssignment() {
    as._AddAssignment();

}
function UpdateAssignment() {
    as._UpdateAssignment();

}