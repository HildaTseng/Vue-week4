import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

          const app = {
            data() {
              return {
                apiUrl :"https://vue3-course-api.hexschool.io/v2/admin/signin" ,
                user: {
                  username: "",
                  password: "",
                },
              };
            },
            methods: {
              login() {               
                axios
                  .post(this.apiUrl, this.user)
                  .then((res) => {   
                     // 將token 存入cookie                 
                    const { token, expired } = res.data;                    
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                    alert(res.data.message)
                    window.location = 'products.html';
                  })
                  .catch((err) => {                    
                    alert(err.data.message);
                  });
              },
            }           
          };

          createApp(app).mount("#app");