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

       

        filterTemplate: function () {
            var now = new Date();
            this._fromPicker = $('<div class="input-group date date-picker margin-bottom-5" data-date-format="mm/dd/yyyy"><input type="text" class="form-control form-filter input-sm" readonly="" name="order_date_from" placeholder="From"><span class="input-group-btn"><button class="btn btn-sm default" type="button" style="height: 30px;"><i class="fa fa-calendar"></i></button></span></div>').datepicker({ defaultDate: now.setFullYear(now.getFullYear() - 1) });
            this._toPicker = $('<div class="input-group date date-picker" data-date-format="mm/dd/yyyy"><input type="text" class="form-control form-filter input-sm" readonly="" name="order_date_to" placeholder="To"><span class="input-group-btn"><button class="btn btn-sm default" type="button"  style="height: 30px;"><i class="fa fa-calendar"></i></button></span></div>').datepicker({ defaultDate: now.setFullYear(now.getFullYear() - 1) });
            return $("<div>").append(this._fromPicker).append(this._toPicker);
        }

        
    });

    jsGrid.fields.date = DateField;

    

    var spntotalpage = 1;
    var iPageNumber = 1;
    var isDeleted = false;

    $("#vendorgrid").jsGrid({
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
                    url: "/vendor/data",
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
                

            },
            insertItem: function (item) {
               

                return $.ajax({
                    type: "POST",
                    url: "/vendor/data",
                    data: item,
                    dataType: "json",
                    success: function (datas) {
                        swal("Success!", "New vendor has added!", "success");
                       
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
                

                return $.ajax({
                    type: "PUT",
                    url: "/vendor/data",
                    data: item,
                    dataType: "json",
                    success: function (datas) {
                        swal("Success!", "Changes were updated!", "success");
                        
                    }
                });

            },
            deleteItem: function (item) {




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
                                url: "/product/data",
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

        
        fields: [
            

            { name: "VendorName", title: "Vendor Name", type: "text", width: 150, align: "center", validate: "required" },
            { name: "ProductType", title: "Product Type", type: "text", width: 150, align: "center", validate: "required" },
            
            {
                name: "Status", type: "select", title: "Status", sorting: true, items: statuses, valueField: "Id", textField: "Name", align: "left", autosearch: true,
                itemTemplate: function (value, item) {
                    if (item.Status) {
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
                



               
            }
            
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
                $("#vendorgrid").jsGrid("openPage", page);
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
                $("#vendorgrid").jsGrid("openPage", page);
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
                    $("#vendorgrid").jsGrid("openPage", page);
                }
            } catch{ }
        }
    });

    $("#pager").on("change", function () {
        var page = parseInt($(this).val(), 10);
        $("#vendorgrid").jsGrid("openPage", page);
    });

    $("#pageSizeData").on('change', function (event) {
        $("#vendorgrid").jsGrid("option", "pageSize", this.value);

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


