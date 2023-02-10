let listWinCase = []
let tempWinCase = []


function handleResult() {
    let n = 3 // size of table (3x3)
    let l_win = 3 // ăn 3 thì thắng

    // Case 1 hàng ngang
    for (let i = 1; i <= n * n; i++) {
        if (n - i % n >= l_win - 1 && i % n != 0) {
            tempWinCase = []
            for (let j = i; j < i + l_win; j++) {
                tempWinCase.push(j)
            }
            listWinCase.push(tempWinCase)
        }
    }

    // Case đường chéo phụ
    for (let i = l_win; i <= n * n; i++) {
        if (i % n >= l_win || i % n == 0) {
            if (i < n * n - (n * (l_win - 1) - 1)) {
                tempWinCase = []
                for (let j = i; j <= i + (n - 1) * (l_win - 1); j += n - 1) {
                    tempWinCase.push(j);
                }
                listWinCase.push(tempWinCase)
            }
        }
    }

    // Case đường chéo chính
    for (let i = 1; i <= n * n; i++) {
        if (n - i % n >= l_win - 1 && i % n != 0) {
            if (i < n * n - (n * (l_win - 1) - 1)) {
                tempWinCase = []
                for (let j = i; j <= i + (n + 1) * (l_win - 1); j += n + 1) {
                    tempWinCase.push(j);
                }
                listWinCase.push(tempWinCase)
            }
        }
    }

    // Case hàng dọc
    for (let i = 1; i < n * n - (n * (l_win - 1) - 1); i++) {

        tempWinCase = []
        for (let j = i; j <= i + n * (l_win - 1); j += n) {
            tempWinCase.push(j);
        }
        listWinCase.push(tempWinCase)
    }


}

function containsAll(needles, haystack) {
    for (var i = 0; i < needles.length; i++) {
        if (!haystack.includes(needles[i])) return false
    }
    return true;
}

function check_win_case(arr) {
    for (let c of listWinCase) {
        if (containsAll(c, arr)) {
            return true
        }
    }
    return false
}

handleResult();

let listSelectedX = []
let listSelectedO = []

let flag = true;
$('.cell').click((e) => {
    flag = !flag
    e.target.value = flag ? 'X' : 'O'
    e.target.disabled = true
    flag ? e.target.classList.add('cell-o') : e.target.classList.add('cell-x')
    flag ? listSelectedX.push(Number(e.target.id)) : listSelectedO.push(Number(e.target.id))
    flag ? $('.lbl-turn').html('Lượt đi: O') : $('.lbl-turn').html('Lượt đi: X')
    if (check_win_case(listSelectedO)) {
        $('.lbl-turn').html('O thắng!')
        for(i of $('.cell')){
            i.disabled = true
        }
    }
    else if (check_win_case(listSelectedX)) {
        $('.lbl-turn').html('X thắng!')
        for(i of $('.cell')){
            i.disabled = true
        }
    }
    else if (listSelectedO.length + listSelectedX.length == 9){
        $('.lbl-turn').html('Không có người thắng cuộc!')
    }
})