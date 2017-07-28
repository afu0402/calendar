(function(){
  var calendar = {};

  // 获取日期数据函数
  calendar.getMonthData = function(year,month) {
    var result = {};
        result.data =[];
        result.month=null;
        result.year=null;
    // 如果没有传入年份和月份参数 默认使用现在的年月份
    if(!year || !month) {
      var today = new Date();
          year = today.getFullYear();
          month = today.getMonth()+1;
          today = today.getDate();
    }
    // 获取当月的第一天
    var theDate = new Date(year,month-1,1);
    var theMonthDay = theDate.getDay()

    // 获取上个月的最后一天
    var lastMonth = new Date(year,month-1,0);
    var lastMonthDay= lastMonth.getDate();
    //获取当月的最后一天
    var lastDay = new Date(year,month,0);
    var lastDayDate= lastDay.getDate();

    for(var i =0;i<6*7;i++) {
      //循环日历面板单位格的位置减去 当月第一天的日期得出应该显示上个月多少个数据；
      var date = i-theMonthDay+1;
      var showDate = date; //date有可能得出负数showdate转化为正常数字
      var thisMonth = month;

      if(date <=0) { //如果date是负数表示是上个月的数据；
        showDate = lastDayDate+date;
        thisMonth=month-1;
      }else if(date>lastDayDate) {//如果date超过本月的最后一天表示这是下个月的数据
        showDate = showDate - lastDayDate
        thisMonth=month+1;
      }
      result.data.push({
        month:thisMonth,
        date:date,
        showDate:showDate
      })
    }
    result.year=year
    result.month=month
    result.today=today;
    return result;
  }
// 渲染函数
  calendar.render=function(data){
    var  date = data
    var  now = new Date().getDate();
    var  thisMonth = new Date().getMonth()+1;
    var template= '<header class="calendar-wrap-title">'+
          '<span class="calendar-wrap-title-left"><</span><h2>'+date.year+'-'+date.month+'</h2><span class="calendar-wrap-title-right">></span>'+
        '</header>'+
        '<table class="date-table" cellpadding=0 cellspacing=0>'+
          '<thead>'+
            '<tr>'+
              '<th>Sun</th>'+
              '<th>Mon</th>'+
              '<th>Tues</th>'+
              '<th>Wed</th>'+
              '<th>Thur</th>'+
              '<th>Fri</th>'+
              '<th>Sat</th>'+
            '</tr>'+
          '</thead>'+
          '<tbody>';
          for(var i =0;i<date.data.length;i++) {
            var data=date.data[i]
            if(i%7===0) {
              template+='<tr>'
            }

            if(now == data.showDate&&thisMonth == data.month ){
                 template+='<td class="today">'+data.showDate+'</td>'
            }else {
              template+='<td>'+data.showDate+'</td>'
            }
              
            if(i%7===6) {
              template+='</tr>'
            }
          }
          template+='</tbody>'+'</table>'+'<div class="calendar-wrap-retuntoday">回到今天</div>';
          return template;

  }

  calendar.init = function (year,month) {
    var dateData=calendar.getMonthData(year, month);
    var Template =  calendar.render(dateData);
    var year = dateData.year;
    var month = dateData.month;

    //判断下外容器是否已经创建，如果已经创建就只更新innerHTML 如果没创建就新建一个div外容器
    var calendarWrap = document.querySelector('.calendar-wrap');
            if(!calendarWrap) {
              var div = document.createElement('div');
                  div.className= "calendar-wrap"
                  div.innerHTML =Template;
                  document.body.appendChild(div);
            }else{
               calendarWrap.innerHTML=Template;
            }
    // 给左右两个按钮增加点击事件
        var leftBtn = document.querySelector('.calendar-wrap-title-left');
        var rightBtn = document.querySelector('.calendar-wrap-title-right');
        var returnToday = document.querySelector('.calendar-wrap-retuntoday');
        var  Table = document.querySelector('.date-table');
        leftBtn.onclick= function(){
          month--;
          if(month<1) {
            year=year-1;
            month=12;
          }
          calendar.init(year, month)
        }

        rightBtn.onclick= function(){
          month++;
          if(month>12) {
            year=year+1;
            month=1;
          }
          calendar.init(year, month)
        }

        returnToday.onclick =function() {
          var year = new Date().getFullYear();
          var month = new Date().getMonth()+1;
          calendar.init(year, month)
        }
  }


  window.calendar=calendar;
})()