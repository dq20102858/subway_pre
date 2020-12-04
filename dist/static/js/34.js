webpackJsonp([34],{

/***/ "2jNM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/real_time/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var real_time = ({
  data: function data() {
    var _this = this;

    return {
      pickerOptionsStart: {
        disabledDate: function disabledDate(time) {
          if (_this.searchForm.end_time) {
            return time.getTime() > new Date(_this.searchForm.end_time).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: function disabledDate(time) {
          if (_this.searchForm.start_time) {
            return time.getTime() < new Date(_this.searchForm.start_time).getTime();
          }
        }
      },
      projectName: "",
      searchForm: {},
      page_cur: 1,
      page_items: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      dataInfo: []
    };
  },
  created: function created() {
    this.getDataList();
    this.projectName = localStorage.getItem("projectName");
  },

  methods: {
    getDataList: function getDataList() {
      var _this2 = this;

      var page = this.page_cur;
      this.request({
        url: "/location/getRealtimeLists",
        method: "get",
        params: {
          page: page
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this2.dataInfo = data.data;
          _this2.dataList = data.data.data;
          _this2.page_cur = parseInt(data.data.current_page);
          _this2.page_items = data.data.total;
          _this2.page_size = data.data.per_page;
          _this2.page_total = data.data.last_page;
        }
      });
    },
    pageChange: function pageChange(value) {
      this.page_cur = value;
      this.getDataList();
    },
    pageToFirst: function pageToFirst() {
      this.page_cur = 1;
      this.getDataList();
    },
    pageToLast: function pageToLast() {
      this.page_cur = this.page_total;
      this.getDataList();
    },
    pageSearch: function pageSearch() {
      this.page_cur = 1;
      this.getDataList();
    },
    resetSerach: function resetSerach() {
      this.searchForm = {
        loco_id: "",
        alert_type: "",
        start_time: "",
        end_time: ""
      };
      this.getDataList();
    },
    goDel: function goDel(id) {
      var _this3 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this3.request({
          url: "/search/deleteAlert",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this3.$message({
              type: "success",
              message: "删除成功！"
            });
            _this3.getDataList();
          }
        });
      }).catch(function () {});
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3d0e4103","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/real_time/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"realtime"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"search","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("ZsIH")}}),_vm._v("实时定位\n      ")])])],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-peple"},[_c('div',{staticClass:"title"},[_vm._v(_vm._s(_vm.projectName)),_c('span',[_vm._v("当日人数："+_vm._s(_vm.dataInfo.oneline_num)+"人")]),_c('span',[_vm._v("在线人数："+_vm._s(_vm.dataInfo.all_num)+"人")])])]),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('h3',{staticClass:"aptitle"},[_vm._v("当日在线人员列表")]),_vm._v(" "),_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"label":"序号"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',[_vm._v(_vm._s(scope.$index+(_vm.page_cur - 1) * _vm.page_size + 1))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"姓名"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"location","label":"位置"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"line_type","label":"线别"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"number","label":"定位设备编号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"入场时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"leave_time","label":"出场时间","show-overflow-tooltip":""}})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.page_items,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_real_time = (esExports);
// CONCATENATED MODULE: ./src/views/real_time/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("AZXP")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  real_time,
  views_real_time,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_real_time = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "AZXP":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("G1ob");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("340b29a6", content, true);

/***/ }),

/***/ "G1ob":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.app-page-peple {\r\n  padding: 10px 0 30px 0;\n}\n.app-page-peple .title {\r\n  text-align: center;\r\n  color: #1d397a;\r\n  font-size: 24px;\r\n  font-weight: 700;\r\n  margin-bottom: 30px;\n}\n.app-page-peple .title span {\r\n margin-left: 20px;display: inline-block;\r\n font-size: 18px;\n}\n.app-page-peple table {\r\n  width: 100%;\r\n  border: 1px #9db9fa  solid;\r\n  border-collapse: collapse;\n}\n.app-page-peple table td,\r\n.app-page-peple table th {\r\n  text-align: center;\r\n  padding: 12px 0;\r\n  height: 40px;\r\n  min-width: 0;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  text-overflow: ellipsis;\r\n  vertical-align: middle;\r\n  color: #1d397a;\n}\n.app-page-peple table td {\r\n  border-top: 1px solid #9db9fa ;\n}\n.aptitle {\r\n  color: #1d397a;\r\n  font-size: 20px;\r\n  margin-bottom:15px;\n}\r\n", ""]);

// exports


/***/ })

});