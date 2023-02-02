import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import pagination from "./components/pagination.js";
import productModel from "./components/product-model.js";
import deleteProductModal from "./components/delete-product-modal.js";

        //BS model 取用
        let productModal = "";  
        let delProductModal = ""; 
        
        const app = createApp({
            //資料
            data(){
                return{
                    apiUrl: "https://vue3-course-api.hexschool.io/v2/",
                    apiPath: "hilda88",
                    isNew: false,  //判斷是否為新增資料
                    products: [],   //全部產品列表
                    tempProduct: {  //單一產品資料
                        imagesUrl: [],
                    },
                    pages:{},   //存放分頁資料
                }
            },
            // 方法集
            methods: {
                //檢查驗證
                checkLogin() {
                    axios
                        .post(`${this.apiUrl}api/user/check`)
                        .then((res) => {
                            this.getProducts();  //驗證成功時 顯示資料
                        })
                        .catch((err) => {
                            alert(err.data.message);
                            window.location = "login.html";
                        });
                },
                //取得產品資料
                getProducts(page = 1) { //預設值處理
                    axios           
                        .get(`${this.apiUrl}api/${this.apiPath}/admin/products/?page=${page}`)  //用參數決定顯示在第幾頁
                        .then((res) => {     
                            this.pages =  res.data.pagination;  //將page資料儲存
                            this.products = res.data.products;  //將資料寫在畫面上              
                        })
                        .catch((err) => {
                            alert(err.data.message);
                        });
                },
                //更新資料
                updateProduct() {

                    //預設將API設為post
                    let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
                    let http = 'post';

                    //判斷不是新增資料 更改變數的值為put
                    if (!this.isNew) {
                        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                        http = 'put'
                    };
                    //將參數帶入axios
                    axios[http](url, { data: this.tempProduct })
                        .then((res) => {
                            alert(res.data.message);
                            productModal.hide();    //新增或編輯資料成功時 關閉model
                            this.getProducts(); //更新產品列表
                        })
                        .catch((err) => {
                            alert(err.data.message);
                        });
                },
                //開啟model  判斷開啟哪種model
                openModal(isNew, item) {
                    if (isNew === 'new') {  //新增model
                        this.tempProduct = {    //顯示產品資訊表單
                            imagesUrl: [],
                        };
                        this.isNew = true; //新增資料 執行更新資料函式 post API
                        productModal.show();    //產品model開啟
                    } else if (isNew === 'edit') {  //編輯model
                        this.tempProduct = { ...item }; //複製資料
                        this.isNew = false;   //不是新資料 執行更新資料函式 put API
                        productModal.show();    //產品model開啟
                    } else if (isNew === 'delete') {  //刪除model
                        this.tempProduct = { ...item }; 
                        delProductModal.show();  //刪除model開啟
                    };
                },
                //刪除產品
                delProduct() {
                    axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
                        .then((res) => {
                            alert(res.data.message);
                            delProductModal.hide(); //成功刪除時 關閉model
                            this.getProducts(); //更新產品列表
                        })
                        .catch((err) => {
                            alert(err.response.data.message);
                        });
                },

            },
            // 元件
            components:{
                pagination,  
                productModel,
                deleteProductModal,            
            },
            // 生命週期
            mounted(){
                //取BS JS model元素
                productModal = new bootstrap.Modal(document.getElementById('productModal'));
                delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
                
                // cookie有資料時 取出 Token                
                const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,  "$1");
                axios.defaults.headers.common["Authorization"] = token;  //預設每次發出 token 時 在headers放入驗證欄位
                this.checkLogin() ;
            }
        });

        app.mount('#app');