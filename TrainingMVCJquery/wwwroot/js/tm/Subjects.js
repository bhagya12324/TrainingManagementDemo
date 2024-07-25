
$(document).ready(function () {
    Datagrid.Grid();
});
var Datagrid = (function () {

    function Grid() {
        $.ajax({
            url: "http://localhost:5117/api/Subjects/GetSubjects",
            dataType: "json",
            success: function (data) {
                $(".batchDetailsGrid").dxDataGrid({
                    dataSource: data,
                    columns: [
                        {
                            dataField: "subjectName",
                            caption: "Subject Name",
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
                        //form: {
                        //    items: [
                        //        // form items go here
                        //        { dataField: "collegeName", editorType: "dxTextBox" },
                        //    ]
                        //}
                    },
                    onEditingStart: function (e) {
                        // Get the record being edited
                        var record = e.data;
                        // Populate the form fields with the record data
                        console.log("ID = ",record.subjectId);
                        $("#editsubjectid").val(record.subjectId);
                        $('#editsubjectname').val(record.subjectName);
                        $('#editremarks').val(record.remarks)
                        $('#editSubjectsModal').modal('show');
                            
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

//IIFE for Saving Details of subject
var Subjects = (function () {

    function addsubject() {
        var subjectName = $("#subjectname").val();
        var remarks = $("#remarks").val();

        $.ajax({
            type: "POST",
            url: 'http://localhost:5117/api/Subjects/InsertSubjects',
            data: JSON.stringify({ subjectId: 0, subjectName: subjectName, remarks: remarks }),

            success: function (data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: subjectName + ' has been added',
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

    function editsubject() {

        var editSubjectId = $("#editsubjectid").val();
        var editSubjectName = $("#editsubjectname").val();
        var editRemarks = $("#editremarks").val();

        console.log(editSubjectId,editSubjectName, editRemarks);

        $.ajax({
            type: "POST",
            url: 'http://localhost:5117/api/Subjects/UpdateSubjects',
            data: JSON.stringify({ subjectId: editSubjectId, subjectName: editSubjectName, remarks: editRemarks }),

            success: function (data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Subject edited succesffully!',
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
                    text: error.statusText,
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
        addsubject: addsubject,
        editsubject: editsubject
    }
})();



//save button click
$(document).on("click", ".saveButton", function () {
    if (!$('#addForm')[0].checkValidity()) {
        $("#addSubmitButton").trigger("click");
    } else {
        Subjects.addsubject();
    }
});
//edit save button
$(document).on("click", ".editsaveButton", function () {
    if (!$('#editForm')[0].checkValidity()) {
        $("#editSubmitButton").trigger("click");
    } else {
        Subjects.editsubject();
    }
});
