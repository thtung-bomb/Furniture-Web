$(document).ready(function () {
    // Thêm hover effect cho các phần tử .item
    $(".item").hover(function () {
        $(this).css("transform", "scale(1.2)");
    }, function () {
        $(this).css("transform", "scale(1)");
    });

    // Khởi tạo Slick carousel
    $(".single-carousel").slick({
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        // prevArrow: '<button className="slick-prev"><i className=" fa fa-angle-left"></i></button>',
        // nextArrow: '<button className="slick-next"><i className="fa fa-angle-right"></i></button>',
        prevArrow: '<button className="slick-prev"><i className=" fa fa-angle-left"></i></button>',
        nextArrow: '<button className="slick-next"><i className="fa fa-angle-right"></i></button>',

    });
});
document.addEventListener("DOMContentLoaded", function () {
    var quoteButton = document.getElementById("quoteButton");
    var loginCard = document.getElementById("loginCard");
    var closeBtn = document.getElementById("close");
    var overlay = document.getElementById("overlay");
    var body = document.getElementsByClassName("main")[0];

    // Bắt sự kiện click vào nút "Quote"
    // quoteButton.addEventListener("click", function () {
    //     // Hiển thị form login
    //     loginCard.style.display = "block";
    //     overlay.style.zIndex = "100";
    //     overlay.style.backgroundColor = "#DFE9F4";
    //     overlay.style.opacity = "0.5";
    //     body.style.pointerEvents = "none";
    // });

    // Bắt sự kiện click vào nút "Close"
    // closeBtn.addEventListener("click", function () {
    //     // Ẩn form login
    //     loginCard.style.display = "none";
    //     // Đặt lại giá trị của lớp phủ
    //     overlay.style.zIndex = "-1";
    //     overlay.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
    //     overlay.style.opacity = "0";
    //     // Khôi phục các thuộc tính của phần tử .main
    //     body.style.pointerEvents = "auto";
    // });
});






