function Delete() {

    swal({
        title: "Are you sure?",       
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
        function () {
            swal("Deleted!", "Your file has been deleted.", "success");
        });

}
function Reject() {

    swal({
        title: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
		confirmButtonText: "Yes, Decline it!",
        closeOnConfirm: false
    },
        function () {
			swal("Declined!", "Your Trip has been Decline.", "success");
        });

}

function Update() {
   
    swal({
        title: "Updated Successfully!",       
        type: "success",
        button: "Aww yiss!",
    });

}

function Assign() {

    swal({
        title: "Truck Assign Successfully!",
        type: "success",
        button: "Aww yiss!",
    });

}
function Accept() {

    swal({
		title: "Order Confirmed Successfully!",
        type: "success",
        button: "Aww yiss!",
    });

}

function Create() {
   
    swal({
        title: "Created Successfully!",       
        type: "success",
        button: "Aww yiss!",
    });

}

function Coordinator() {

    swal({
        title: "Coordinator Assigned Successfully!",
        type: "success",
        button: "Aww yiss!",
    });

}

function TruckAssign1(){
	swal({
  title: "Ajax request example",
  text: "Submit to run ajax request",
  type: "info",
  showCancelButton: true,
  closeOnConfirm: false,
  showLoaderOnConfirm: true
}, function () {
  setTimeout(function () {
    swal("Ajax request finished!");
  }, 2000);
});
}

function TruckAssign() {
    swal({
        title: "Assign Truck",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Select Trucking company",
        cancelButtonText: "Send Request",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                swal.close();
                $('#large1').modal('show');
            } else {
                swal.close();
                $('#full2').modal('show');
            }
        });
}
function AssignTruck() {
    swal({
        title: "Assign Truck",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Manual Assign!",
        cancelButtonText: "Auto Assign!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                swal.close();
                $('#large').modal('show');
            } else {
                swal.close();
                $('#full').modal('show');
            }
        });
}
