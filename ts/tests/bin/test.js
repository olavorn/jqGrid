///<reference path="../index.d.ts" />
///<reference types="qunit" />
$.jgrid = $.jgrid || {};
$.jgrid.no_legacy_api = true;
$.jgrid.useJSON = true;
$(function () {
    "use strict";
    var mydata = [
        { id: "11", invdate: "2007-10-01", name: "test", note: "note", amount: 0, tax: 0, closed: true, ship_via: "TN", total: 0 },
        { id: "21", invdate: "2007-10-02", name: "test2", note: "note2", amount: 351.75, tax: 23.45, closed: false, ship_via: "FE", total: 375.2 },
        { id: "31", invdate: "2007-09-01", name: "test3", note: "note3", amount: 400, tax: 30, closed: false, ship_via: "FE", total: 430 },
        { id: "41", invdate: "2007-10-04", name: "test4", note: "note4", amount: 200, tax: 10, closed: true, ship_via: "TN", total: 210 },
        { id: "51", invdate: "2007-10-31", name: "test5", note: "note5", amount: 300, tax: 20, closed: false, ship_via: "FE", total: 320 },
        { id: "61", invdate: "2007-09-06", name: "test6", note: "note6", amount: 400, tax: 30, closed: false, ship_via: "FE", total: 430 },
        { id: "71", invdate: "2007-10-04", name: "test7", note: "note7", amount: 200, tax: 10, closed: true, ship_via: "TN", total: 210 },
        { id: "81", invdate: "2007-10-03", name: "test8", note: "note8", amount: 300, tax: 20, closed: false, ship_via: "FE", total: 320 },
        { id: "91", invdate: "2007-09-01", name: "test9", note: "note9", amount: 400, tax: 30, closed: false, ship_via: "TN", total: 430 },
        { id: "101", invdate: "2007-09-08", name: "test10", note: "note10", amount: 500, tax: 30, closed: true, ship_via: "TN", total: 530 },
        { id: "111", invdate: "2007-09-08", name: "test11", note: "note11", amount: 500, tax: 30, closed: false, ship_via: "FE", total: 530 },
        { id: "121", invdate: "2007-09-10", name: "test12", note: "note12", amount: 500, tax: 30, closed: false, ship_via: "FE", total: 530 }
    ], initDateSearch = function (elem) {
        setTimeout(function () {
            $(elem).datepicker({
                dateFormat: "dd-M-yy",
                autoSize: true,
                changeYear: true,
                changeMonth: true,
                showWeek: true,
                showButtonPanel: true
            });
        }, 100);
    }, editableInAddForm = function (options) {
        if (options.mode === "addForm") {
            return true;
        }
        if (options.mode === "editForm") {
            return "disabled";
        }
        return false; // don't allows editing in other editing modes
    }, $grid = $("#grid");
    $grid.jqGrid({
        data: mydata,
        colModel: [
            { name: "name", label: "Client", width: 100, editable: true },
            { name: "invdate", label: "Date", width: 80, align: "center", sorttype: "date",
                formatter: "date", formatoptions: { newformat: "d-M-Y" }, editable: editableInAddForm,
                searchoptions: { sopt: ["eq", "ne", "lt", "le", "gt", "ge"], dataInit: initDateSearch } },
            { name: "amount", label: "Amount", width: 75, template: "number" },
            { name: "tax", label: "Tax", width: 100, template: "number",
                searchoptions: { sopt: ["nIn", "eq", "ne", "lt", "le", "gt", "ge", "in", "ni"] } },
            { name: "total", label: "Total", width: 60, template: "number" },
            { name: "closed", label: "Closed", width: 70, template: "booleanCheckboxFa", editable: editableInAddForm },
            { name: "ship_via", label: "Shipped via", width: 105, align: "center", formatter: "select", editable: editableInAddForm,
                edittype: "select", editoptions: { value: "FE:FedEx;TN:TNT;IN:Intim", defaultValue: "IN" },
                stype: "select", searchoptions: { sopt: ["eq", "ne"], value: ":Any;FE:FedEx;TN:TNT;IN:IN" } },
            { name: "note", label: "Notes", width: 60, edittype: "textarea", sortable: false, editable: true }
        ],
        pager: true,
        iconSet: "fontAwesome",
        autoencode: true,
        viewrecords: true,
        rowNum: 10,
        altRows: true,
        altclass: "myAltRowClass",
        rowList: [5, 10, 20, "10000:All"],
        caption: "Demonstration of the usage editable property of colModel as function",
        navOptions: {
            del: false
        },
        searching: {
            closeAfterSearch: true,
            closeAfterReset: true,
            closeOnEscape: true,
            searchOnEnter: true,
            multipleSearch: true,
            multipleGroup: true,
            showQuery: true
        }
    }).jqGrid("navGrid");
    QUnit.test("grid exists", function (assert) {
        assert.equal($grid.length, 1, "Passed!");
    });
    QUnit.test("gbox exists", function (assert) {
        assert.equal($grid.closest(".ui-jqgrid").length, 1, "Passed!");
    });
    QUnit.test("grid expando exists", function (assert) {
        assert.notEqual($grid[0].grid, undefined, "Passed!");
    });
    QUnit.test("p expando exists", function (assert) {
        assert.notEqual($grid[0].p, undefined, "Passed!");
    });
    QUnit.test("rows of grid exist - it's table", function (assert) {
        assert.notEqual($grid[0].rows, undefined, "Passed!");
    });
    QUnit.test("grid has 11 rows", function (assert) {
        assert.equal($grid[0].rows.length, 11, "Passed!");
    });
    QUnit.test("grid has 1 hidden first rows (with class jqgfirstrow)", function (assert) {
        assert.equal($($grid[0].rows[0]).hasClass("jqgfirstrow"), true, "Passed!");
    });
    QUnit.test("grid has 10 data rows (with class jqgrow)", function (assert) {
        assert.equal($grid.find(">tbody>tr.jqgrow").length, 10, "Passed!");
    });
    QUnit.test("grid has the pager", function (assert) {
        var pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
        assert.equal($(pagerIdSelector).length, 1, "Passed!");
    });
    QUnit.test("the pager is DIV", function (assert) {
        var pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
        assert.equal($(pagerIdSelector)[0].nodeName.toUpperCase(), "DIV", "Passed!");
    });
    QUnit.test("the pager is inside of gbox", function (assert) {
        var pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
        assert.equal($(pagerIdSelector).closest(".ui-jqgrid").length, 1, "Passed!");
    });
    QUnit.test("the pager is inside of gbox", function (assert) {
        var pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
        assert.equal($(pagerIdSelector).closest(".ui-jqgrid").length, 1, "Passed!");
    });
    QUnit.test("the pager has INPUT with 1", function (assert) {
        var pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
        assert.equal($(pagerIdSelector).find("input.ui-pg-input").val(), "1", "Passed!");
    });
    QUnit.test("the last page is 2", function (assert) {
        var pagerIdSelector = $grid.jqGrid("getGridParam", "pager"), lastPageSpanId = "#sp_1_" + pagerIdSelector.substring(1);
        assert.equal($(lastPageSpanId).text(), "2", "Passed!");
    });
    QUnit.test("the page size is 10", function (assert) {
        var pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
        assert.equal($(pagerIdSelector).find("select.ui-pg-selbox").val(), "10", "Passed!");
    });
    QUnit.test("the page info \"View 1 - 10 of 12\"", function (assert) {
        var pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
        assert.equal($(pagerIdSelector).find(".ui-paging-info").text(), "View 1 - 10 of 12", "Passed!");
    });
    QUnit.test("the pager contains navigator bar", function (assert) {
        var pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
        assert.equal($(pagerIdSelector).find(".navtable").length, 1, "Passed!");
    });
    QUnit.test("the navigator bar is DIV", function (assert) {
        var pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
        assert.equal($(pagerIdSelector).find(".navtable")[0].nodeName.toUpperCase(), "DIV", "Passed!");
    });
    QUnit.test("the navigator bar contains 4 buttons", function (assert) {
        var pagerIdSelector = $grid.jqGrid("getGridParam", "pager");
        assert.equal($(pagerIdSelector).find(".navtable").find(".ui-pg-button>.ui-pg-div").length, 4, "Passed!");
    });
    QUnit.test("the first row if data have id 11", function (assert) {
        assert.equal($grid[0].rows[1].id, "11", "Passed!");
    });
    QUnit.test("formatted 2007-10-01 is 01-Oct-2007", function (assert) {
        assert.equal($($grid[0].rows[1].cells[1]).text(), "01-Oct-2007", "Passed!");
    });
    QUnit.test("0 formatted as number is 0.00", function (assert) {
        assert.equal($($grid[0].rows[1].cells[2]).text(), "0.00", "Passed!");
    });
    QUnit.test("test data returned by getRowData for the rowid=51", function (assert) {
        var rowData = $grid.jqGrid("getRowData", "51");
        assert.deepEqual(rowData, { invdate: "31-Oct-2007", name: "test5", note: "note5", amount: "300.00", tax: "20.00", closed: "false", ship_via: "FE", total: "320.00" }, "Passed!");
    });
    QUnit.test("test add data by addRowData for the rowid=10", function (assert) {
        var rowData = $grid.jqGrid("addRowData", "10", { invdate: "2015-04-03", name: "test15", note: "note15", amount: 300.00, tax: 20.00, closed: true, ship_via: "FE", total: 320.00 });
        assert.equal($grid[0].rows.length, 12, "the grid has 11 data rows");
        assert.equal($($grid[0].rows[11].cells[1]).text(), "03-Apr-2015", "2015-04-03 is displayed as 03-Apr-2015");
        assert.equal($($grid[0].rows[11]).hasClass("myAltRowClass"), false, "the last row has no myAltRowClass");
        assert.equal($($grid[0].rows[10]).hasClass("myAltRowClass"), true, "the previous row has myAltRowClass");
    });
});
