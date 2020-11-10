webpackJsonp([23],{

/***/ "2R5V":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.dialog-sebei .el-textarea__inner {\r\n  border: 1px #9db9fa solid;\r\n  color: #4b6eca;\r\n  height: 100px;\n}\n.dialog-sebei .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-sebei .el-form-item__label {\r\n  width: 170px;\n}\n.dialog-sebei .el-form-item__content {\r\n  margin-left: 170px;\n}\n.dialog-sebei .el-form-item-inline .el-input--medium {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-sebei .el-form-item-inline input {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-sebei .el-select {\r\n  width: 100%;\n}\n.wall-errora .el-form-item__error {\r\n  padding-left: 23px;\n}\n.wall-errorb .el-form-item__error {\r\n  padding-left: 12px;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "RwO4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/location/walldetector.vue
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

/* harmony default export */ var walldetector = ({
  data: function data() {
    return {
      activeIndex: 1,
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      detectorData: {},
      detectorRules: {
        depart_id: [{ required: true, message: "请选择公司", trigger: "change" }],
        name: [{
          required: true,
          message: "请输入设备名称2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }, {
          pattern: /(^\S+).*(\S+$)/,
          message: "开始和结尾不能有空格",
          trigger: "blur"
        }],
        number: [{
          required: true,
          message: "请输入设备编号2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }],
        line_type: [{ required: true, message: "请选择线路", trigger: "change" }],
        // ip: [
        //   {
        //     required: true,
        //     message: "请输入IP地址",
        //     trigger: "blur"
        //   },
        //   {
        //     pattern:
        //       "^((25[0-5]|2[0-4]\\d|[1]{1}\\d{1}\\d{1}|[1-9]{1}\\d{1}|\\d{1})($|(?!\\.$)\\.)){4}$",
        //     message: "请输入正确的IP地址",
        //     trigger: "blur"
        //   }
        // ],
        start_flag: [{
          required: true,
          message: "请输入位置公里",
          trigger: "blur"
        }, {
          pattern: /^\d{1,4}$/,
          message: "请输入1-4位正整数",
          trigger: "blur"
        }],
        start_length: [{
          required: true,
          message: "请输入位置米",
          trigger: "blur"
        }, {
          pattern: /^\d{1,3}$/,
          message: "请输入1-3位正整数",
          trigger: "blur"
        }],
        is_enter: [{
          required: true,
          message: "请选择",
          trigger: "change"
        }]
      },
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      companyList: [],
      lineTypeDes: "",
      linTypeList: [],
      lineTypeStart: "",
      lineTypeEnd: "",
      numberSearch: ""
    };
  },
  mounted: function mounted() {
    document.querySelector("#app-menu-items #menu_location").classList.add("is-active");
  },
  created: function created() {
    this.getCompanyList();
    this.getLiTypeList();
    this.getDataList();
  },

  methods: {
    getCompanyList: function getCompanyList() {
      var _this = this;

      this.request({
        url: "/apply/getCompanyLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this.companyList = data.data;
        }
      });
    },
    getLiTypeList: function getLiTypeList() {
      var _this2 = this;

      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this2.linTypeList = data.data;
        }
      });
    },
    selectLineType: function selectLineType(value) {
      var that = this;
      this.linTypeList.map(function (item, index) {
        if (item.id == value) {
          that.lineTypeDes = "里程范围：" + item.tip;
          that.lineTypeStart = item.start;
          that.lineTypeEnd = item.end;
        }
      });
      console.log(this.lineTypeDes);
    },
    getDataList: function getDataList() {
      var _this3 = this;

      var page = this.page_cur;
      var number = this.numberSearch;
      this.request({
        url: "/location/getWallDetectorPages",
        method: "get",
        params: {
          page: page,
          number: number
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this3.dataList = data.data.data;
          _this3.page_cur = parseInt(data.data.current_page);
          _this3.pageTotal = data.data.total;
          _this3.page_size = data.data.per_page;
          _this3.page_total = data.data.last_page;
        }
      });
    },
    pageChange: function pageChange(value) {
      this.page_cur = value;
      this.getDataList();
    },
    toFirstPage: function toFirstPage() {
      this.pageChange(1);
    },
    toLastPage: function toLastPage() {
      this.pageChange(this.page_total);
    },
    searchEvent: function searchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    resetSerach: function resetSerach() {
      this.numberSearch = "";
      this.page_cur = 1;
      this.getDataList();
    },

    //
    addDialogInfo: function addDialogInfo() {
      var _this4 = this;

      this.diaLogTitle = "添加信号基站信息";
      this.diaLogFormVisible = true;
      this.detectorData = {
        depart_id: "",
        name: "",
        number: "",
        line_type: "",
        ip: "",
        start_flag: "",
        start_length: "",
        is_enter: ""
      };
      this.lineTypeDes = "";

      this.addShow = true;
      this.$nextTick(function () {
        _this4.$refs["detectorForm"].clearValidate();
      });
    },
    addOrEditDialog: function addOrEditDialog() {
      var _this5 = this;

      this.$refs["detectorForm"].validate(function (valid) {
        if (valid) {
          var data = _this5.detectorData;

          // //里程判断
          var startTotal = parseInt(data.start_flag * 1000) + parseInt(data.start_length);
          var lineStartTotal = _this5.lineTypeStart * 1000;
          var lineEndTotal = _this5.lineTypeEnd * 1000;
          if (parseInt(startTotal) < parseInt(lineStartTotal)) {
            _this5.$message.error("输入的位置不在里程范围内");
            return false;
          }
          if (parseInt(startTotal) > parseInt(lineEndTotal)) {
            _this5.$message.error("输入的位置不在里程范围内");
            return false;
          }
          _this5.request({
            url: "/location/addOrEditWallDetector",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this5.diaLogFormVisible = false;
              _this5.detectorData.name = "";
              _this5.detectorData.description = "";
              _this5.pageChange(1);
              _this5.$message({
                type: "success",
                message: "保存成功！"
              });
            }
          });
        } else {
          console.log("操作失败！");
          return false;
        }
      });
    },
    goEdit: function goEdit(id) {
      var _this6 = this;

      this.diaLogTitle = "修改信号基站信息";
      this.diaLogFormVisible = true;
      this.$nextTick(function () {
        _this6.$refs["detectorForm"].clearValidate();
      });

      this.request({
        url: "/location/getWallDetector",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this6.detectorData = data.data;

          var that = _this6;
          _this6.linTypeList.map(function (item, index) {
            if (item.id == data.data.line_type) {
              that.lineTypeDes = "里程范围：" + item.tip;
              that.lineTypeStart = item.start;
              that.lineTypeEnd = item.end;
            }
          });

          _this6.detectorData.start_flag = parseInt(data.data.start_flag);
          _this6.detectorData.start_length = parseInt(data.data.start_length);
        }
      });
    },
    goDel: function goDel(id) {
      var _this7 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this7.request({
          url: "/location/deleteWallDetector",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this7.$message({
              type: "success",
              message: "删除成功！"
            });
            _this7.getDataList();
          }
        });
      }).catch(function () {});
    },
    changeTime: function changeTime(time) {
      if (time !== null && time !== undefined && time !== "") {
        return "<span style='display:block'>" + time.substring(0, 10) + "</span><span style='display:block'>" + time.substring(time.length - 8) + "</span>";
      } else {
        return "";
      }
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6a9f0ab0","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/location/walldetector.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"location"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"walldetector","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("1xgB")}}),_vm._v("定位管理\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"location"}},[_vm._v("人员定位统计")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"walldetector"},on:{"click":_vm.resetSerach}},[_vm._v("信号基站")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"locationbind"}},[_vm._v("定位从设备")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.addDialogInfo}},[_vm._v("添加设备")])],1),_vm._v(" "),_c('div',{staticClass:"el-serach"},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"请输入设备编号查询","clearable":"","maxlength":"30"},model:{value:(_vm.numberSearch),callback:function ($$v) {_vm.numberSearch=$$v},expression:"numberSearch"}}),_vm._v(" "),_c('el-button',{on:{"click":_vm.searchEvent}},[_vm._v("查询")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"prop":"id","label":"序号","width":"100"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',[_vm._v(_vm._s(scope.$index+(_vm.page_cur - 1) * _vm.page_size + 1))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"number","label":"设备编号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"location","label":"位置"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"type","label":"网关或基站"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.type==1)?_c('span',{staticStyle:{"background":"#5cb85c","color":"#fff","border-radius":"3px","padding":"1px 4px"}},[_vm._v("网关")]):_c('span',{staticStyle:{"background":"#d9534f","color":"#fff","border-radius":"3px","padding":"1px 4px"}},[_vm._v("基站")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"line","label":"线路"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('p',{domProps:{"innerHTML":_vm._s(_vm.changeTime(scope.row.create_time))}})]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"120"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){return _vm.goEdit(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){return _vm.goDel(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.pageTotal,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.toFirstPage}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.toLastPage}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])]),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-sebei",attrs:{"width":"700px","close-on-click-modal":false,"title":this.diaLogTitle,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{ref:"detectorForm",staticClass:"el-form-custom",attrs:{"model":_vm.detectorData,"rules":_vm.detectorRules}},[_c('el-form-item',{attrs:{"label":"公司名称：","prop":"depart_id"}},[_c('el-select',{attrs:{"placeholder":"请选择公司","clearable":""},model:{value:(_vm.detectorData.depart_id),callback:function ($$v) {_vm.$set(_vm.detectorData, "depart_id", $$v)},expression:"detectorData.depart_id"}},_vm._l((_vm.companyList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}),1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"设备名称：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.detectorData.name),callback:function ($$v) {_vm.$set(_vm.detectorData, "name", $$v)},expression:"detectorData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"设备编号：","prop":"number"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.detectorData.number),callback:function ($$v) {_vm.$set(_vm.detectorData, "number", $$v)},expression:"detectorData.number"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"设定线路","prop":"line_type"}},[_c('el-select',{attrs:{"placeholder":"请选择","clearable":""},on:{"change":function($event){return _vm.selectLineType($event)}},model:{value:(_vm.detectorData.line_type),callback:function ($$v) {_vm.$set(_vm.detectorData, "line_type", $$v)},expression:"detectorData.line_type"}},_vm._l((_vm.linTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}),1),_vm._v(" "),_c('div',{staticClass:"el-form-item__error"},[_vm._v(_vm._s(_vm.lineTypeDes))])],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-dk is-required",attrs:{"label":"所在位置："}},[_c('el-form-item',{attrs:{"prop":"start_flag"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"公里","maxlength":"4"},model:{value:(_vm.detectorData.start_flag),callback:function ($$v) {_vm.$set(_vm.detectorData, "start_flag", $$v)},expression:"detectorData.start_flag"}},[_c('template',{slot:"prepend"},[_vm._v("DK")])],2)],1),_vm._v(" "),_c('el-form-item',{staticClass:"errorss",attrs:{"prop":"start_length"}},[_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"米","maxlength":"3"},model:{value:(_vm.detectorData.start_length),callback:function ($$v) {_vm.$set(_vm.detectorData, "start_length", $$v)},expression:"detectorData.start_length"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"网关或基站：","prop":"type"}},[_c('el-radio',{attrs:{"label":1},model:{value:(_vm.detectorData.type),callback:function ($$v) {_vm.$set(_vm.detectorData, "type", $$v)},expression:"detectorData.type"}},[_vm._v("网关")]),_vm._v(" "),_c('el-radio',{attrs:{"label":2},model:{value:(_vm.detectorData.type),callback:function ($$v) {_vm.$set(_vm.detectorData, "type", $$v)},expression:"detectorData.type"}},[_vm._v("基站")])],1),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogFormVisible = false}}},[_vm._v("关闭")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){return _vm.addOrEditDialog()}}},[_vm._v("确定")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var location_walldetector = (esExports);
// CONCATENATED MODULE: ./src/views/location/walldetector.vue
function injectStyle (ssrContext) {
  __webpack_require__("gsfX")
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
  walldetector,
  location_walldetector,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_location_walldetector = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "gsfX":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2R5V");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("682b0954", content, true);

/***/ })

});