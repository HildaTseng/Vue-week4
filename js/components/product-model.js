export default {
    props : ['temp-product', 'updateProduct'],
    template:`<div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-4">
                    <div class="mb-3">
                        <label for="imageUrl" class="form-label">主要圖片</label>
                        <input v-model="tempProduct.imageUrl" type="text" class="form-control mb-2" placeholder="請輸入圖片連結">
                        <img class="img-fluid" :src="tempProduct.imageUrl">
                    </div>

                    <h3 class="mb-3">多圖新增</h3>
                    <!-- 多圖陣列 -->                      
                    <template v-if="Array.isArray(tempProduct.imagesUrl)">
                        <div class="mb-1" v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                            <div class="mb-3">
                                <label for="imageUrl" class="form-label">圖片網址</label>
                                <input v-model="tempProduct.imagesUrl[key]" type="text" class="form-control"
                                    placeholder="請輸入圖片連結">
                                <button  class="btn btn-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.splice(key, 1)">
                                刪除圖片
                                </button>
                            </div>
                            <img class="img-fluid" :src="tempProduct.imagesUrl[key]">
                        </div>
                        <div v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                            <button class="btn btn-outline-primary btn-sm d-block w-100"
                            @click="tempProduct.imagesUrl.push('')">
                            新增圖片
                            </button>
                        </div>
                        <div v-else>
                            <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">
                            刪除圖片
                            </button>
                        </div>
                    </template>   
                </div>
            
                <div class="col-sm-8">
                    <div class="mb-3">
                        <label   label for="title" class="form-label">標題</label>
                        <input v-model="tempProduct.title" id="title" type="text" class="form-control" placeholder="請輸入標題">
                    </div>

                    <div class="row">
                        <div class="mb-3 col-md-6">
                            <label for="category" class="form-label">分類</label>
                            <input v-model="tempProduct.category" id="category" type="text" class="form-control"
                                placeholder="請輸入分類">
                        </div>
                        <div class="mb-3 col-md-6">
                            <label for="price" class="form-label">單位</label>
                            <input v-model="tempProduct.unit" id="unit" type="text" class="form-control" placeholder="請輸入單位">
                        </div>
                    </div>

                    <div class="row">
                        <div class="mb-3 col-md-6">
                            <label for="origin_price" class="form-label">原價</label>
                            <input v-model.number="tempProduct.origin_price" id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價">
                        </div>
                        <div class="mb-3 col-md-6">
                            <label for="price" class="form-label">售價</label>
                            <input v-model.number="tempProduct.price" id="price" type="number" min="0" class="form-control"
                                placeholder="請輸入售價">
                        </div>
                    </div>
                    <hr>

                    <div class="mb-3">
                        <label for="description" class="form-label">產品描述</label>
                        <textarea v-model="tempProduct.description" id="description" type="text" class="form-control"
                                    placeholder="請輸入產品描述">
                        </textarea>
                    </div>
                    <div class="mb-3">
                        <label for="content" class="form-label">說明內容</label>
                        <textarea v-model="tempProduct.content" id="description" type="text" class="form-control"
                                    placeholder="請輸入說明內容">
                        </textarea>
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input v-model="tempProduct.is_enabled" id="is_enabled" class="form-check-input" type="checkbox"
                                :true-value="1" :false-value="0">
                            <label class="form-check-label" for="is_enabled">是否啟用</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
                </button>
                <button type="button" class="btn btn-primary" @click="updateProduct">
                確認
                </button>
            </div>
        </div>
    </div>`,
};