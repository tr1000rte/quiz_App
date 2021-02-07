$("#add_question").submit(() => {
    alert('add question successfully')
})

$("#update_question").submit((event) => {
    event.preventDefault();
    // alert('修改完成')
});

if(window.location.pathname == "/") {
    $deleteQuiz = $(".table tbody td a.delete")
    $deleteQuiz.click(() => {
        let id = $(this).attr("data-id")
        console.log(id);

        var request = {
            "url": `http://localhost:8080/api/quizes/${id}`,
            "method": "DELETE"
        }
        if(confirm("確認刪除?")) {
            $.ajax(request).done((response) => {
                alert("選擇題目已被刪除")
                location.reload();
            })
        }
    })
}