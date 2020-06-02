function check_all(f) {
    var chk = document.getElementsByName("chkbox");
    for (i = 0; i < chk.length; i++)
        chk[i].checked = f.chkall.checked;
}
function is_checked(elements_name) {
    var checked = false;
    var chk = document.getElementsByName(elements_name);
    for (var i = 0; i < chk.length; i++) {
        if (chk[i].checked) {
            checked = true;
        }
    }
    return checked;
}
function fboardlist_submit(f) {
    if (!is_checked("chkbox")) {
        alert("check brand to" + document.pressed + "at least one.");
        return false;
    }
    return true;
}
function sortTable(n, dir) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("brand_table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == true) {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == false) {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}