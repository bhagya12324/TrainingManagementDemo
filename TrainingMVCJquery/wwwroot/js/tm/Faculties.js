
var selectedFacultyId = 0;
var selectedSubjectId = 0;

$(document).ready(function () {
    $.ajax({
        url: "http://localhost:5117/api/FacultiesSubjects/GetFacultySubjectRemarks",
        type: "GET",
        success: function (data) {
            console.log("testing", data);
            // Loop through data to create cards
            for (var i = 0; i < data.length; i++) {
                // Check if it's time to start a new row
                if (i % 3 == 0) {
                    // If so, create a new row
                    var newRow = $("<div class='row'></div>");
                    $("#card-container").append(newRow);
                }
                // Create card for current data item
                if (data[i].subjects.length > 0) {
                    var badges = "";
                    $.each(data[i].subjects, function (index, sub) {
                        badges += `<span class="badge badge-default">${sub}</span> &nbsp;`
                    });
                    var card = $("<div class='col-md-4'><div class='card' style='background-color: #6c757d;'><div class='card-body'> " + badges + " <h4 class='card-title' style='color: white;'>" + data[i].facultyName + "</h4><p class='card-text' style='color: white;'>" + data[i].remarks + "</p><a href='#' style='float: right; ' class='btn btn-primary btn-sm '" + 'data-toggle="modal" data-target="#editFacultyModal"' + " onclick='showFaculty(" + data[i].facultyId + ")' >Edit</a></div></div></div>");
                } else {
                    var card = $("<div class='col-md-4'><div class='card' style='background-color: #6c757d;'><div class='card-body'> " + '<span class="badge badge-default" style="visibility:hidden">' + 'NULL' + '</span>' + "<h4 class='card-title' style='color: white;'>" + data[i].facultyName + "</h4><p class='card-text' style='color: white;'>" + data[i].remarks + "</p><a href='#' style='float: right; ' class='btn btn-primary btn-sm ' " + 'data-toggle="modal" data-target="#editFacultyModal"' + " onclick = 'showFaculty("+data[i].facultyId+")'>Edit</a></div></div></div>");

                }
                // Add card to current row
                newRow.append(card);
            }

            // dropdown filling faculties
            $.ajax({
                url: "http://localhost:5117/api/Faculties/GetFaculties",
                dataType: "json",
                success: function (response) {
                    var dropdownMenu = $("#facultiesDropdown-menu");
                    dropdownMenu.empty();
                    $.each(response, function (index, item) {
                        dropdownMenu.append(`<a class="dropdown-item faculties-Dropdown" href="#" value=${item.facultyId}>${item.facultyName}</a>`);
                    });


                    // dropdown filling subjects
                    $.ajax({
                        url: "http://localhost:5117/api/Subjects/GetSubjects",
                        dataType: "json",
                        success: function (response) {
                            var dropdownMenu = $("#subjectsDropdown-menu");
                            dropdownMenu.empty();
                            $.each(response, function (index, item) {
                                dropdownMenu.append(`<a class="dropdown-item subjects-Dropdown" href="#" value=${item.subjectId}>${item.subjectName}</a>`);
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

            
        },
        error: function () {
            swal({
                title: "ERROR",
                text: error.statusText + " Something went wrong!!",
                icon: "error",
                button: {
                    text: "OK",
                    className: "btn-primary",
                },
            });
        }
    })
    

});

function AddFaculty() {
    if (!$('#addFacultyForm')[0].checkValidity()) {
        $("#submit-button").trigger("click");
        return
    }

    var name = $("#facultyName").val();
    var remarks = $("#remarks").val();
    console.log(name, remarks);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5117/api/Faculties/InsertFaculties',
        data: JSON.stringify({
            facultyId: 1, facultyName: name, remarks: remarks,discontinue:'y'
        }),
        success: function () {
            swal({
                title: "SUCCESS",
                text: "Faculty Added Successfully",
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

function AssignSubject()
{
    var remarks = $("#assignSubjectRemark").val();

    $.ajax({
        type: 'POST',
        url: 'http://localhost:5117/api/FacultiesSubjects/InsertFacultySubject',
        data: JSON.stringify({
            facultySubjectId : 0,facultyId: selectedFacultyId, subjectId: selectedSubjectId, remarks: remarks, discontinue: 'y'
        }),
        success: function () {
            swal({
                title: "SUCCESS",
                text: "Subject Assigned Successfully",
                icon: "success",
                button: {
                    text: "OK",
                    className: "btn-primary",
                },
            });
            var btn = $(".cl");
            btn.trigger('click');
            location.reload(true)

        },
        error: function (error) {

            console.log(error);
            swal({
                title: "ERROR " + error.status,
                text: error.statusText + " Try Again",
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
function showFaculty(id) 
{
    $.ajax({
        url: "http://localhost:5117/api/Faculties/showFaculty?id=" + id,
        type: 'GET',
        success: function (faculty) {

            console.log("faculty details",id, faculty);
            $("#updateFacultyId").val(faculty.facultyId);
            $("#updateFacultyName").val(faculty.facultyName);
            $("#updateRemarks").val(faculty.remarks);
        },
        error: function (error) {
            console.log(error);
        }
        });
}
function UpdateFaculty()
{
    var name = $("#updateFacultyName").val();
    var remarks = $("#updateRemarks").val();
    var id = $("#updateFacultyId").val();
    console.log(name, remarks, id);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5117/api/Faculties/UpdateFaculties',

        data: JSON.stringify({ FacultyId: id, FacultyName: name, Remarks: remarks, discontinue: 'NULL' }),
        success: function (data) {
            console.log(data);
            swal({
                title: "SUCCESS",
                text: "Updated Successfully",
                icon: "success",
                button: {
                    text: "OK",
                    className: "btn-primary",
                },
            });
            location.reload(true);
        },
        error: function (error) {
            swal({
                title: "ERROR",
                text: error.statusText + " Something went wrong!!",
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

$(document).on("click", ".faculties-Dropdown", function () {

    console.log("faculties dropdown clicked")
    //console.log(this)

    //console.log(this.value)
    var facultyId = $("#facultyId").val();
    console.log("sd" + facultyId)

    var selectedItem = $(this).attr("value");
    $("#facultyId").val(selectedItem);
    selectedFacultyId = selectedItem;
    var selectedText = $(this).text();
    $("#dropdownMenuButton1").text(selectedText);


});

$(document).on("click", ".subjects-Dropdown", function () {

    console.log("faculties dropdown clicked")
    //console.log(this)

    //console.log(this.value)
    var subjectId = $("#subjectId").val();
    console.log("sd" + subjectId)

    var selectedItem = $(this).attr("value");
    console.log("subject id" + selectedItem)
    $("#subjectId").val(selectedItem);
    selectedSubjectId = selectedItem;
    // Check if the input field is empty

    var selectedText = $(this).text();
    $("#dropdownMenuButton2").text(selectedText);


});