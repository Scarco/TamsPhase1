$(function () {

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }


    var permissions = [
        { Name: "(All)", Id: 0 },
        { Name: "Product", Id: 1 },
        { Name: "Job", Id: 2 },
        { Name: "Transportation", Id: 3 },
        { Name: "Vendor", Id: 4 },
        { Name: "User", Id: 5 }
    ];

    var statuses = [
        { Name: "(All)", Id: -1 },
        { Name: "Active", Id: 1 },
        { Name: "In Active", Id: 0 }
    ];


    var MultiselectField = function (config) {
        jsGrid.Field.call(this, config);
    };

    MultiselectField.prototype = new jsGrid.Field({

        items: [],
        textField: "",

        itemTemplate: function (value) {
            return $.makeArray(value).join(", ");
        },

        _createSelect: function (selected) {
            var textField = this.textField;
            var $result = $("<select>").prop("multiple", true);

            $.each(this.items, function (_, item) {
                var value = item[textField];
                var $opt = $("<option>").text(value);

                if ($.inArray(value, selected) > -1) {
                    $opt.attr("selected", "selected");
                }

                $result.append($opt);
            });

            return $result;
        },

        insertTemplate: function () {
            var insertControl = this._insertControl = this._createSelect();

            setTimeout(function () {
                insertControl.multiselect({
                    minWidth: 140
                });
            });

            return insertControl;
        },

        editTemplate: function (value) {
            var editControl = this._editControl = this._createSelect(value);

            setTimeout(function () {
                editControl.multiselect({
                    minWidth: 140
                });
            });

            return editControl;
        },

        insertValue: function () {
            return this._insertControl.find("option:selected").map(function () {
                return this.selected ? $(this).text() : null;
            });
        },

        editValue: function () {
            return this._editControl.find("option:selected").map(function () {
                return this.selected ? $(this).text() : null;
            });
        }

    });

    jsGrid.fields.multiselect = MultiselectField;


    var SolRiaDateTimeField = function (config) {
        jsGrid.Field.call(this, config);
    };
    SolRiaDateTimeField.prototype = new jsGrid.Field({
        sorter: function (date1, date2) {
            return new Date(date1) - new Date(date2);
        },

        itemTemplate: function (value) {
            if (value === null) {
                return '';
            } else {
                return moment(value).format('L LTS');
            }
        }
        , insertTemplate: function (value) {
            this._insertPicker = $('<input>').datetimepicker({
                format: 'L LTS',
                defaultDate: moment(),
                widgetPositioning: {
                    horizontal: 'auto',
                    vertical: 'bottom'
                }
            });

            this._insertPicker.data('DateTimePicker').date(moment());
            return this._insertPicker;
        },

        editTemplate: function (value) {
            this._editPicker = $('<input>').datetimepicker({
                format: 'L LTS',
                widgetPositioning: {
                    horizontal: 'auto',
                    vertical: 'bottom'
                }
            });

            if (value !== null) {
                this._editPicker.data('DateTimePicker').defaultDate(moment(value));
                this._editPicker.data('DateTimePicker').date(moment(value));
            }
            return this._editPicker;
        },

        insertValue: function () {
            var insertValue = this._insertPicker.data('DateTimePicker').date();
            if (typeof insertDate !== 'undefined' && insertDate !== null) {
                return insertDate.format('L LTS');
            } else {
                return null;
            }
        },

        editValue: function () {
            var editValue = this._editPicker.data('DateTimePicker').date();
            if (typeof editValue !== 'undefined' && editValue !== null) {
                return editValue.format('L LTS');
            } else {
                return null;
            }
        }
    });
    jsGrid.fields.solRiaDateTimeField = SolRiaDateTimeField;



    var DateField = function (config) {
        jsGrid.Field.call(this, config);
    };

    DateField.prototype = new jsGrid.Field({
        sorter: function (date1, date2) {
            return new Date(date1) - new Date(date2);
        },

        itemTemplate: function (value) {
            return new Date(value).toDateString();
        },

        // filterTemplate: function () {
        //     var now = new Date();
        //     this._fromPicker = $("<input>").datepicker({ defaultDate: now.setFullYear(now.getFullYear() - 1) });
        //     this._toPicker = $("<input>").datepicker({ defaultDate: now.setFullYear(now.getFullYear() + 1) });
        //     return $("<div>").append(this._fromPicker).append(this._toPicker);
        // },


        filterTemplate: function () {
            var now = new Date();
            this._fromPicker = $('<div class="input-group date date-picker margin-bottom-5" data-date-format="mm/dd/yyyy"><input type="text" class="form-control form-filter input-sm" readonly="" name="order_date_from" placeholder="From"><span class="input-group-btn"><button class="btn btn-sm default" type="button" style="height: 30px;"><i class="fa fa-calendar"></i></button></span></div>').datepicker({ defaultDate: now.setFullYear(now.getFullYear() - 1) });
            this._toPicker = $('<div class="input-group date date-picker" data-date-format="mm/dd/yyyy"><input type="text" class="form-control form-filter input-sm" readonly="" name="order_date_to" placeholder="To"><span class="input-group-btn"><button class="btn btn-sm default" type="button"  style="height: 30px;"><i class="fa fa-calendar"></i></button></span></div>').datepicker({ defaultDate: now.setFullYear(now.getFullYear() - 1) });
            return $("<div>").append(this._fromPicker).append(this._toPicker);
        }

        // insertTemplate: function (value) {
        //     return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
        // },

        // editTemplate: function (value) {
        //     return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
        // },

        // insertValue: function () {
        //     return this._insertPicker.datepicker("getDate").toISOString();
        // },

        // editValue: function () {
        //     return this._editPicker.datepicker("getDate").toISOString();
        // },

        // ,filterValue: function () {
        //     return {
        //         from: this._fromPicker.datepicker("getDate"),
        //         to: this._toPicker.datepicker("getDate")
        //     };
        // }
    });

    jsGrid.fields.date = DateField;

    // jsGrid.ControlField.prototype.editButtonClass = "btn btn-outline btn-circle btn-sm purple dark btn-outline sbold";
    // jsGrid.ControlField.prototype.deleteButtonClass = "btn btn-outline btn-circle dark btn-sm black";
    // jsGrid.ControlField.prototype.clearFilterButtonClass = "btn btn-sm btn-default filter-cancel";
    // jsGrid.ControlField.prototype.searchModeButtonClass = "btn btn-sm btn-success filter-submit margin-bottom";
    // jsGrid.ControlField.prototype.cancelEditButtonClass = "btn btn-sm btn-default filter-cancel";

    var spntotalpage = 1;
    var iPageNumber = 1;
    var isDeleted = false;

    $("#rolesgrid").jsGrid({
        // height: "auto",
        width: "100%",
        filtering: true,
        inserting: true,
        editing: true,
        sorting: true,
        autoload: true,

        paging: true,
        pageSize: $('#pageSizeData').val(),
        pageButtonCount: 5,

        pageIndex: 1,

        //pageLoading: true,

        pagerContainer: "#externalPager",
        pagerFormat: "Current page: {pageIndex} &nbsp;&nbsp; {first} {prev} {pages} {next} {last} &nbsp;&nbsp; Total pages: {pageCount}  &nbsp;&nbsp;  Total records: {itemCount}",
        pagePrevText: "<",
        pageNextText: ">",
        pageFirstText: "<<",
        pageLastText: ">>",
        pageNavigatorNextText: "&#8230;",
        pageNavigatorPrevText: "&#8230;",


        loadIndication: true,
        loadIndicationDelay: 500,
        loadMessage: "Please, wait...",
        loadShading: true,

        noDataContent: "No role(s) found!",

        searchModeButtonTooltip: "Switch to searching", // tooltip of switching filtering/inserting button in inserting mode
        insertModeButtonTooltip: "Switch to inserting", // tooltip of switching filtering/inserting button in filtering mode
        editButtonTooltip: "Edit",                      // tooltip of edit item button
        deleteButtonTooltip: "Delete",                  // tooltip of delete item button
        searchButtonTooltip: "Search",                  // tooltip of search button
        clearFilterButtonTooltip: "Clear filter",       // tooltip of clear filter button
        insertButtonTooltip: "Insert",                  // tooltip of insert button
        updateButtonTooltip: "Update",                  // tooltip of update item button
        cancelEditButtonTooltip: "Cancel edit",         // tooltip of cancel editing button


        // searchModeButtonClass: "btn btn-sm btn-success filter-submit margin-bottom",
        // clearFilterButtonClass: "btn btn-sm btn-default filter-cancel",
        // editButtonClass: "btn btn-outline btn-circle btn-sm purple dark btn-outline sbold",
        // deleteButtonClass: "btn btn-outline btn-circle dark btn-sm black",
        // cancelEditButtonClass: "btn btn-sm btn-default filter-cancel",

        confirmDeleting: false,
        //deleteConfirm: "Do you really want to delete this role?",       

        controller: {
            loadData: function (filter) {

                // return $.ajax({
                //     type: "GET",
                //     url: "/roles/data", ///" + startIndex,
                //     data: filter
                // });

                var d = $.Deferred();

                return $.ajax({
                    type: "GET",
                    url: "/roles/data",
                    data: filter,
                    dataType: "json"
                    , success: function (datas) {

                        spntotalpage = Math.ceil(datas.length / $('#pageSizeData').val());;

                        var iTotalPage = spntotalpage != null && spntotalpage != undefined && spntotalpage != "" ? parseInt(spntotalpage) : "1";
                        $('#pager').html('');
                        for (var index = 1; index <= iTotalPage; index++) {
                            $('#pager').append($('<option>', {
                                value: index,
                                text: index
                            }));
                        }

                        $('#spntotalPageNumbers').html(spntotalpage);
                        $('#spnTotalRecords').html(datas.length);

                        isDeleted = false;

                        d.resolve($.map(datas, function (item, itemIndex) {
                            return $.extend(item, { "Index": itemIndex + 1 });
                        }));

                    }
                })
                // .done(function (result) {

                //     spntotalpage = Math.ceil(result.length / $('#pageSizeData').val());;

                //     var iTotalPage = spntotalpage != null && spntotalpage != undefined && spntotalpage != "" ? parseInt(spntotalpage) : "1";
                //     $('#pager').html('');
                //     for (var index = 1; index <= iTotalPage; index++) {
                //         $('#pager').append($('<option>', {
                //             value: index,
                //             text: index
                //         }));
                //     }

                //     $('#spnTotalPage').html(result.length);

                //     isDeleted = false;

                //     d.resolve($.map(result.data, function (item, itemIndex) {
                //         debugger;

                //         return $.extend(item, { "Index": itemIndex + 1 });
                //     }));


                // });


            },
            insertItem: function (item) {
                // return $.ajax({
                //     type: "POST",
                //     url: "/roles/data",
                //     data: item
                // });

                return $.ajax({
                    type: "POST",
                    url: "/roles/data",
                    data: item,
                    dataType: "json",
                    success: function (datas) {
                        swal("Success!", "New role has added!", "success");
                        // toastr.success("New role has added!");
                        //this._grid.search();
                    }
                });



            },
            finishInsert: function (insertedItem) {
                isDeleted = false;

                var grid = this._grid;
                grid.option("data").push(insertedItem);
                grid.refresh();
            },
            updateItem: function (item) {
                // return $.ajax({
                //     type: "PUT",
                //     url: "/roles/data",
                //     data: item
                // });

                return $.ajax({
                    type: "PUT",
                    url: "/roles/data",
                    data: item,
                    dataType: "json",
                    success: function (datas) {
                        swal("Success!", "Changes were updated!", "success");
                        //toastr.success("Changes were updated.");
                        //this._grid.search();
                    }
                });

            },
            deleteItem: function (item) {


                // return $.ajax({
                //     type: "DELETE",
                //     url: "/roles/data",
                //     data: item
                // });


                return swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover the changes!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel please!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            $.ajax({
                                type: "DELETE",
                                url: "/roles/data",
                                data: item,
                                success: function (datas) {
                                    // this._grid.search();
                                    swal("Deleted!", "Selected role has been deleted.", "success");
                                    isDeleted = true;
                                }
                            });
                        } else {
                            swal("Cancelled", "Changes are safe :)", "error");
                            // this._grid.search();

                            isDeleted = false;

                        }
                    });


            },
            finishDelete: function (deletedItem, deletedItemIndex) {
                // this._grid.search();     
                var grid = this._grid;

                if (isDeleted) {
                    grid.option("data").splice(deletedItemIndex, 1);
                    grid.refresh();
                }

                grid.search();

            }
        },

        updateOnResize: true,

        rowClick: function (args) {
            var $row = this.rowByItem(args.item);
            $row.toggleClass("highlight");
        },

        // rowRenderer: function (item, itemIndex) {
        //     var grid = this;
        //     var $editButton = $("<input>").attr("type", "button").addClass("jsgrid-button jsgrid-edit-button");
        //     var $deleteButton = $("<input>").attr("type", "button").addClass("jsgrid-button jsgrid-delete-button");

        //     $editButton.on("click", function () {
        //         grid.editItem(item);
        //     });

        //     $deleteButton.on("click", function () {
        //         grid.deleteItem(item);
        //     });

        //     return $("<tr>")
        //         .append($("<td>"))
        //         .append($editButton)
        //         .append($deleteButton);
        // },

        // editRowRenderer: function (item, itemIndex) {
        //     var grid = this;

        //     var $updateButton = $("<input>").attr("type", "button").addClass("btn btn-outline btn-circle btn-sm purple dark sbold");
        //     var $cancelButton = $("<input>").attr("type", "button").addClass("btn btn-sm btn-default filter-cancel");

        //     $updateButton.on("click", function () {
        //         grid.updateItem(item, { Name: $nameEditor.val() });
        //     });

        //     $cancelButton.on("click", function () {
        //         grid.cancelEdit();
        //     });

        //     return $("<tr>")
        //         .append($("<td>"))
        //         .append($updateButton)
        //         .append($cancelButton);
        // },

        // rowRenderer: function (item, itemIndex) {
        //     return $("").append("").append(itemIndex);
        // },

        // selectable: true,
        // rowClick: function (args) {
        //     var $row = this.rowByItem(args.item);
        //     var trow = $("tr.highlight");
        //     trow.removeClass("highlight");
        //     $row.addClass("highlight");
        //     selectedItem = args.item;
        // },

        //pagerFormat: "total items: {itemsCount}",

        // onRefreshed: function () {
        //     var grid = this;
        //     $(".jsgrid-pager").contents().filter(function () {
        //         return this.nodeType == 3;
        //     }).each(function () {
        //         this.textContent = this.textContent.replace('{itemsCount}', $(grid).jsGrid("_itemsCount"));
        //     });
        // },

        fields: [
            // {
            //     title: "S.No", type: "number", width: 30, filtering: false, editing: false, inserting: false, align: "center",
            //     itemTemplate: function (item, itemIndex) {
            //         return "1"; //$(this).jsGrid("option", "data")[rowIndex];
            //     }
            // },

            { name: "Index", title: "#", type: "number", width: 30, filtering: false, editing: false, inserting: false, align: "center", },
            { name: "RoleName", title: "User Role", type: "text", width: 150, align: "left", validate: "required", autosearch: true },
            {
                name: "Permission", title: "Permission", type: "select", items: permissions, valueField: "Id", textField: "Name", align: "left", autosearch: true, validate: "required",
                insertTemplate: function (value, item) {
                    var $result = this.__proto__.insertTemplate.call(this); //original input                 
                    $result.find("option[value='0']").remove();
                    return $result;
                }
                , editTemplate: function (item) {
                    var $result = this.__proto__.editTemplate.call(this); //original input          
                    $result.find("option[value='0']").remove();
                    $result.val(item);
                    return $result;
                }
            },
            {
                name: "IsActive", type: "select", title: "Status", sorting: true, items: statuses, valueField: "Id", textField: "Name", align: "left", autosearch: true,
                itemTemplate: function (value, item) {
                    if (item.IsActive) {
                        return '<span class="label label-sm label-success"> Active </span>';
                    }
                    return '<span class="label label-sm label-danger">In Active</span>';
                },
                insertTemplate: function (value, item) {
                    var $result = this.__proto__.insertTemplate.call(this); //original input                 
                    $result.find("option[value='-1']").remove();
                    return $result;
                }
                , editTemplate: function (item) {
                    var $result = this.__proto__.editTemplate.call(this); //original input          
                    $result.find("option[value='-1']").remove();
                    if (item)
                        $result.val(1);
                    else
                        $result.val(0);
                    return $result;
                }
                , filterTemplate: function () {
                    var $result = this.__proto__.filterTemplate.call(this); //original input
                    return $result;
                }
            },
            {
                name: "LastUpdate", title: "Last Update", type: "date", width: 75, editing: false, inserting: false, autosearch: true
            },
            {
                type: "control", width: 70, align: "center"
                // , editButton: false, deleteButton: false
                // , itemTemplate: function (_, item) {


                //     var $customEditButton = $("<a>").addClass("btn btn-outline btn-circle btn-sm purple dark sbold")
                //         .html('<i class="fa fa-edit"></i> Edit')
                //         .on("click", function (e) {

                //             var $row = this.rowByItem(e.item);
                //             var trow = $("tr.highlight");
                //             trow.addClass("highlight");
                //             selectedItem = e.item;

                //             alert('edit');
                //         });

                //     var $customDeleteButton = $("<a>").addClass("btn btn-outline btn-circle dark btn-sm black")
                //         .html('<i class="fa fa-trash-o"></i> Delete')
                //         .on("click", function (e) {
                //             //    $(this).jsGrid("deleteItem", item);

                //             alert('delete');
                //         });

                //     return $("<div>").append($customEditButton).append("&nbsp;&nbsp;").append($customDeleteButton);

                // }

                // , filterTemplate: function (_, item) {



                //     var $customSearchButton = $("<a>").addClass("btn btn-sm btn-success filter-submit margin-bottom")
                //         .html('<i class="fa fa-search"></i> Search')
                //         .on("click", function (e) {

                //             alert('search');
                //         });

                //     var $customClearButton = $("<a>").addClass("btn btn-sm btn-default filter-cancel")
                //         .html('<i class="fa fa-times"></i> Reset')
                //         .on("click", function (e) {
                //             // $(this).jsGrid("clearFilter");
                //             alert('reset');
                //         });

                //     return $("<div>").append($customSearchButton).append("&nbsp;&nbsp;").append($customClearButton);
                // }




                // , editButton: true, deleteButton: true
                // , itemTemplate: function (value, item) {
                //     var $customEditButton = '<a class="btn btn-outline btn-circle btn-sm purple dark sbold"><i class="fa fa-edit"></i> Edit </a>&nbsp;&nbsp;';
                //     $customEditButton.on("click", function () {
                //       $("#rolesgrid").jsGrid("editItem", item);
                //     });
                //     var $customDeleteButton = '<a class="btn btn-outline btn-circle dark btn-sm black"><i class="fa fa-trash-o"></i> Delete </a>';
                //     $customDeleteButton.on("click", function () {
                //         $("#rolesgrid").jsGrid("cancelEdit");
                //     });
                //     return $("<div>").append($customEditButton).append($customDeleteButton);
                // }
                // ,headerTemplate: function () {
                //     return '<a class="btn green">Switch to insert&nbsp;<i class="fa fa-plus"></i></a>';
                // },
                // , filterTemplate: function (value, item) {
                //     var $customSearchButton = '<button class="btn btn-sm btn-success filter-submit margin-bottom"><i class="fa fa-search"></i> Search</button>';
                //     $customSearchButton.on("click", function () {
                //         $("#rolesgrid").jsGrid("search");
                //     });
                //     var $customClearButton = '&nbsp;&nbsp;<button class="btn btn-sm btn-default filter-cancel"><i class="fa fa-times"></i> Reset</button>';
                //     $customClearButton.on("click", function () {
                //         $("#rolesgrid").jsGrid("clearFilter");
                //     });
                //     return $("<div>").append($customSearchButton).append($customClearButton);
                // }
            }
            // , {
            //     type: "control", width: 100
            //     , editButton: false, deleteButton: false
            //     , itemTemplate: function (_, item) {
            //         return $("<a>").addClass("btn btn-outline btn-circle dark btn-sm black")
            //             .html('<i class="fa fa-trash-o"></i> Delete ')
            //             .on("click", function (e) {
            //             });
            //     }
            // }
        ]
    });


    $("#aPrev").on("click", function () {
        if ($('#iPageNo').val() != '') {
            try {
                $("#aNext").removeClass('disabled');
                var page = parseInt($('#iPageNo').val(), 10);
                if (page > 1) {
                    page = page - 1;
                    $('#iPageNo').val(page);
                    $(this).removeClass('disabled');
                    if (page == 1)
                        $(this).addClass('disabled');
                }
                else {
                    $(this).addClass('disabled');
                }
                $("#rolesgrid").jsGrid("openPage", page);
            } catch{ }
        }
    });


    $("#aNext").on("click", function () {
        if ($('#iPageNo').val() != '') {
            try {
                $("#aPrev").removeClass('disabled');
                var page = parseInt($('#iPageNo').val(), 10);
                var itotalPage = parseInt($('#spntotalPageNumbers').html(), 10);
                if (page < (itotalPage)) {
                    page = page + 1;
                    $('#iPageNo').val(page);
                    if (page == itotalPage)
                        $(this).addClass('disabled');
                }
                else {
                    $(this).addClass('disabled');
                }
                $("#rolesgrid").jsGrid("openPage", page);
            } catch{ }
        }
    });

    $("#iPageNo").on("change", function () {
        if ($(this).val() != '') {
            try {
                var page = parseInt($(this).val(), 10);
                var itotalPage = parseInt($('#spntotalPageNumbers').html(), 10);
                if (page <= itotalPage) {
                    var page = parseInt($(this).val(), 10);
                    if (page == 1) {
                        $("#aPrev").addClass('disabled');
                        $("#aNext").removeClass('disabled');
                    }
                    else if (page == itotalPage) {
                        $("#aNext").addClass('disabled');
                        $("#aPrev").removeClass('disabled');
                    }
                    else {
                        $("#aPrev").removeClass('disabled');
                        $("#aNext").removeClass('disabled');
                    }
                    $("#rolesgrid").jsGrid("openPage", page);
                }
            } catch{ }
        }
    });

    $("#pager").on("change", function () {
        var page = parseInt($(this).val(), 10);
        $("#rolesgrid").jsGrid("openPage", page);
    });

    $("#pageSizeData").on('change', function (event) {
        $("#rolesgrid").jsGrid("option", "pageSize", this.value);

        if ($('#externalPager').is(':hidden')) {
            $('#pageLabel').css('display', 'none');
            $('#aPrev').css('display', 'none');
            $('#aNext').css('display', 'none');
            $('#iPageNo').css('display', 'none');
            $('#spntotalPageNumbers').css('display', 'none');
            $('#pageSeparator').css('display', 'none');
            $('#pagecaption').css('display', 'none');
        }
        else {
            $('#pageLabel').css('display', '');
            $('#aPrev').css('display', '');
            $('#aNext').css('display', '');
            $('#iPageNo').css('display', '');
            $('#spntotalPageNumbers').css('display', '');
            $('#pageSeparator').css('display', '');
            $('#pagecaption').css('display', '');
        }
    });

    //$('input[type=text').css('class','form-control form-filter input-sm');

});


