var icecreamModel = {
    list: [
        {id: 't1', name: 'vannila'},
        {id: 't2', name: 'chocolate'},
        {id: 't3', name: 'orange'},
        {id: 't4', name: 'strawberry'},
        {id: 't5', name: 'greentea'},
        {id: 't6', name: 'choco'},
    ],

    getAll: function() {
        return this.list;
    },

    findById: function(id) {
        return $.grep(this.list, function(val) {
                    return id == val.id;
                })[0];
    }
}

var selectionModel = {
    list: [],

    icecreamNumber: 2,

    add: function(item) {
        var list = this.list;
        list.push(item);
        if (list.length > this.icecreamNumber) {
            list.shift();
        }
        this.updateView();
    },

    contain: function(icecream) {
        return this.list.indexOf(icecream) >= 0;
    },

    containById: function(id) {
        return this.contain(icecreamModel.findById(id));
    },

    getIcecreams: function() {
        return this.list;
    },

    updateView: function() {
        updateSelection();
        updateIcecreamList();
    },

    clear: function() {
        this.list = [];
        this.updateView();
    }
}

function ok (title, expect, value) {
    if (expect === value) {
        console.log('OK: ' + title);
    } else {
        console.log('NG: ' + title + "[" + expect + "] -> [" + value + "]");
    }
}

function testModels() {
    var all = icecreamModel.getAll();

    ok("number", all.length, 6);
    ok("icecreammodel.findById", icecreamModel.findById("t4"), all[3]);

    ok("selectionModel:1st", selectionModel.getIcecreams().length, 0);
    ok("selectionModel.contain:empty", false, selectionModel.contain(all[0]))

    selectionModel.add(all[0]);
    ok("selectionModel:2nd", selectionModel.getIcecreams().length, 1);
    ok("selectionModel.contain:contain1", true, selectionModel.contain(all[0]))

    selectionModel.add(all[1]);
    ok("selectionModel:3rd", selectionModel.getIcecreams().length, 2);
    ok("selectionModel.contain:contain2", true, selectionModel.contain(all[1]))

    selectionModel.add(all[2]);
    ok("selectionModel:4th", selectionModel.getIcecreams().length, 2);
    ok("selectionModel.contain:contain3", true, selectionModel.contain(all[2]))
    ok("selectionModel.contain:contain1", false, selectionModel.contain(all[0]))
}

testModels();

$(function() {
    var els = $('#icecreams');
    $.each (icecreamModel.getAll(),
        function(i, icecream) {
            els.append(
                $('<li>')
                    .append($("<input type='checkbox'>")
                        .attr('name', icecream.id))
                        .append($("<span>").text(icecream.name))
                    .click(function() {
                        onclickIcecream(event);
                    })
            ) //end of els.append(
        } // end of function
    ) // end of each

    $("#clear").click(function () {
        selectionModel.clear(); 
    });

    selectionModel.updateView();
});

function updateSelection() {
    $('#icecreams input[type="checkbox"]').each(function(i,elm) {
        elm.checked = selectionModel.containById(elm.name);
    })
}

function updateIcecreamList() {
    $("#icecream-list").text(
        $.map(selectionModel.getIcecreams(), function(val) {
            return val.name;
        }).join(">")
    );
}

function onclickIcecream (event) {
    var checkbox = $(event.currentTarget).find("input[type='checkbox']");

    if (checkbox) {
        selectionModel.add(icecreamModel.findById(checkbox.attr("name")));
    };
}
