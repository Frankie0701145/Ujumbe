
$(window).scroll(function(){
          var scrollTop = $(window).scrollTop();
          var windowHeight = $(window).height();
          var documentHeight = $(document).height();

          if( scrollTop + windowHeight >  documentHeight-0.2){
             var pageNo = $("#pageNo").val();
             var currentLocationCoord = <%- JSON.stringify(currentLocationCoord)%>;
             currentLocationCoord["pageNo"] = pageNo;

             $.getJSON("/locationNews", currentLocationCoord, function(data, status, xhr){
               $.each(data, function(key, val){
                  var name = val.user[0].firstName + " " + val.user[0].lastName;
                  var title = val.title;
                  var text = val.text;
                  var dateDiff = moment(val.createdAt).fromNow();
                  console.log(dateDiff);
                  var html = '<div class="row">\
                        <!--showing the user name  -->\
                        <div class="col-12 mt-2">\
                              <!-- the name of the user -->\
                              <img src="#" alt="..." class="img-thumbnail rounded-circle">\
                              <span class="">'+ name +'</span>\
                              <span class="float-right">' + dateDiff + '</span>\
                        </div>\
                        <!--showing the title -->\
                        <div class="col-12 mt-2">\
                          <div class="row justify-content-center">\
                            <span class="font-weight-bold">'+ title +'</span>\
                          </div>\
                        </div>\
                        <!--the text of the news  -->\
                        <div class="col-12 mt-2">\
                            <div class="text-monospace">\
                              '+ text +'\
                            </div>\
                        </div>\
                        <hr/>\
                        <div class="col-12 mt-2">\
                            <div class="row pl-3">\
                              <div class="col-2">\
                                <a href="#">\
                                  <i class="fas fa-thumbs-up fa-sm faa-vertical"></i>\
                                  <span class="votingText">1000</span>\
                                <a>\
                              </div>\
                              <div class="col-2">\
                                <a href="#">\
                                  <i class="far fa-thumbs-down fa-sm"></i>\
                                  <span class="votingText">1000</span>\
                                </a>\
                              </div>\
                              <div class="col-4">\
                                  <a href="#">\
                                    <i class="far fa-comments fa-sm"></i>\
                                    <span class="votingText">Comment</span>\
                                  </a>\
                              </div>\
                            </div>\
                        </div>\
                  </div>\
                  <hr>';
                  $("#newsWrapper").append(html);
               });
               $("#pageNo").val(parseInt(pageNo)+1);
               console.log($("#pageNo").val());
             }).fail(function(){
               console.log("failed");
             });
          }
});
