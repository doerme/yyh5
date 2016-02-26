<div id="pg_preview_it_pe{{idN}}" class="item j_preview_item selected" data-id="pe{{idN}}" style="left: 0%; top: 0%; width: 100%; height: 10%; z-index: 11; margin: 0px;" data-type="{{type}}">
	 <div class="btn-group item_operate">
		 <button class="btn btn-primary btn-sm j_btn_copy"><span class="glyphicon glyphicon-file"></span>复制</button>
		 <button class="btn btn-primary btn-sm j_btn_remove"><span class="glyphicon glyphicon-trash"></span> 删除</button>
	 </div>
	 <div class="item_mask"></div>
	 <div class="item_wrap">
		 {{if type== "text"}}
		 <div class="item_txt" style="display: inline-block; position: absolute; left: 0px; right: 0px; top: 50%; font-size: 41px; line-height: 41px; color: rgb(0, 0, 0); text-align: center; -webkit-transform: translate(0px, -50%);">单行文字内容</div>
		 {{/if}}
		 {{if type == "image" }}
		 <img class="item_img" src="" />
		 {{/if}}
	 </div>
	 <span class="arrow arrow-r"></span>
	 <span class="arrow arrow-b"></span>
	 <span class="arrow arrow-rb"></span>
	 {{if type == "text"}}
	 <input type="text" class="j_item_txt" style="color: rgb(0, 0, 0); display: none; background-color: rgba(0, 0, 0, 0);">
	 {{/if}}
 </div>
 {{if type == "image"}}
	  <div class="btn btn-primary btn-sm j_btn_upload btn-uploader">
	  <div class="uploader-wrap">
	  <label><input class="j_btn_upload_bt" type="file" name="file"></label>
	  </div>
	  <span class="glyphicon glyphicon-cloud-upload"></span>上传图片
	  </div>
 {{/if}}