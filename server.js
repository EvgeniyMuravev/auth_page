let user = {
   login : '',
   pass : '',  
   load : () => {
      let ls = window.localStorage;
      let log, pass;
      
      login = ls.getItem("login");
      pass = ls.getItem("pass");

      if (login==="log" && pass==="pass") {
         result([log, pass]);
      }   
   },
   save : () => {
      let ls = window.localStorage;
      let login, pass;
      
      login = ls.setItem("login", user.login);
      pass = ls.setItem("pass", user.pass);
   },
   logout : () => {
      let ls = window.localStorage;
      let login, pass;
      
      login = ls.setItem("login", user.login);
      pass = ls.setItem("pass", "");
      show_form();
   }
},

hide_form = (userName) => {
   $('form').style.display = "none";
   $('userName').innerHTML = userName;
   $('hello').style.display = "block";
   $('logout').style.display = "block";
},

show_form = () => {
   $('form').style.display = "block";
   $('userName').innerHTML = "";
   $('hello').style.display = "none";
   $('logout').style.display = "none";
},

$ = (id) =>  {
   return document.getElementById(id);  
},

result = (res) => {
   //скрываем форму авторизации, проходим внутрь
   console.log("Успешня авторизация");
   hide_form(res[0]);
   user.login = res[0];
   user.pass = res[1];
   user.save();
},
error = () => {
   //выдаем сообщение
   console.log("Неуспешня авторизация");
}

function httpGet(log, pass) {
   $('win').style.display = "block";
   let user = [{ login:"log", pass:"pass"}, { login:"log1", pass:"pass"}, { login:"log2", pass:"pass"}];
   return new Promise((resolve, reject) => {
      //функция принимающая логин и пароль
      setTimeout( () => { 
         $('win').style.display = "none";
         //выполняет проверку логина и пароля на соответствие в БД 
         //и соответственно генерирует лобо resolve либо reject
         for( var i=0; i<user.length; i++) {
            if (user[i].login === log && user[i].pass === pass) {
               result([log, pass]);
               break;
            }
         }
         error("error");    
      }, 5000);
   })
}

function auth(login, pass) {
   httpGet(login, pass)
      .then(result, error);
}