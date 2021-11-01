var MODEL = (function () {
  let _pgChange = function (pgID) {
    $.get(`pages/${pgID}/${pgID}.html`, function (data) {
      $("#content").html(data);
    });
  };
  return {
    pgChange: _pgChange,
  };
})();
