<template>
    <div id="app" v-loading.fullscreen="showLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.01)">
        <router-view v-if="reload"></router-view>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          showLoading: false,
          reload: true 
        };
      },
      mounted() {
        this.globalEvBus.$on("showLoading", () => {
          this.showLoading = true;
        });
        this.globalEvBus.$on("hideLoading", () => {
          this.showLoading = false;
        });
        this.globalEvBus.$on("reload", () => {
          this.reload = false;
          this.$nextTick(() => {
            this.reload = true;
          });
        });
      }
    };
</script>
<style>
html {width: 100%;height: 100%;padding: 0px;margin: 0px;}
body{background: #E7EEFF; height: 100%; width: 100%; font-size: 14px;margin: 0;padding: 0; }
p,div,h1,h2,h3,h4,ul,li,span{margin: 0;padding: 0;}
ul,li{list-style-type: none}
i,em {font-style: normal;}
 .el-tooltip__popper{ max-width:50%;line-height: 22px; }
.app-wrapper{height: 100%;}
.app-pages{margin: 15px;}
.app-nowarp{white-space: nowrap;text-overflow: initial}
.app-nowarp .cell{white-space: nowrap;text-overflow: initial;}
.el-button--primary{background: #4b6eca;border-color:#4b6eca}
.pull-left{float: left;}
.pull-right{float: right;}
.text-right{text-align: right}
.blank{height:5px;clear: both;}
 .el-button:focus {background: #4b6eca;border-color:#4b6eca;}
/* hideSidebar */
#app .sidebar-container{z-index: 500;}
#app .hideSidebar  #app-menu-items .el-tooltip{padding:0 5px!important;}
/* bg */
.app-body-black{background: #000; }
.app-page{padding: 20px;}
.app-page-container{border-radius: 6px;padding: 20px; background: #fff;}
.app-page-select{display: block;}
.app-page-select .form-add-item{margin-right: 40px;}
.app-page-select .el-range-separator{padding: 0;}
.app-page-select .select-from-inline{display: inline-block;white-space: nowrap;width: 100%;}
.app-page-select .el-button  span{font-size:14px!important;}
.btn-red-addedit {background: #ff5c75;border-color: #ff5c75;margin-right: 20px;}
.btn-red-addedit:hover, .btn-red-addedit:focus{background: #fe3a58;border-color: #fe3a58;}
.el-serach {float: right;border: 2px #4b6eca solid; border-radius: 3px;}
.el-serach .el-input {width: 178px;}
.el-serach .el-input__inner {background: none;border: none;color: #4b6eca;width: 178px;}
.el-serach .el-button {background: #4b6eca;color: #fff;}
/* table css */
.app-table .el-table-column--selection .cell{padding-left: 17px;}
.app-table .el-table__header-wrapper{background: #3655a5;border-radius: 6px 6px 0 0;padding: 0 0;}
.app-table .el-table__header-wrapper tr th{background: #3655a5;color:#fff;border-bottom: none!important;font-size: 14px;}
.app-table .el-table__header-wrapper .is-leaf{border-bottom: none;}
.app-table .el-table__body-wrapper {border:1px #e7eeff solid;border-bottom: none;}
.app-table .el-table__body-wrapper tr:nth-child(odd){background:#e7eeff;}
.app-table .el-table__body-wrapper tr td{color: #1D397A;}
.app-table .time-warp{width:80px;white-space: normal;display: block;}
.app-table .time-warp-lens .cell{display: inline-block; white-space: nowrap;word-break: keep-all;text-overflow: ellipsis}

.app-operation{white-space: nowrap; text-align: right;}
.app-operation .btn-blue{ border: 1px #4b6eca solid;color: #1d397a}
.app-operation .btn-red{border: 1px #ff5c75 solid;color: #ff5c75}
.app-operation .btn-green{border: 1px #26a80f solid;color: #26a80f}
.app-operation .el-button{margin-left: 0!important;margin-right: 5px;padding: 7px 10px;background: none}
.app-operation .el-button:hover{opacity: 0.5;}
.app-operation .el-button[disabled]{color: #999;border: 1px #999 solid;}
.app-operation .el-button:last-child{margin-right:0}
/*el-form */
.el-form-custom .el-form-item{margin-bottom: 25px;}
.el-form-custom .el-form-item__label{color: #1d397a;}
.el-form-custom .el-input__inner{border: 1px #9db9fa solid!important;color: #4b6eca!important;}
.el-form-custom .el-form-item__error {padding-top: 5px;}
.el-form-custom .el-radio__label{color: #4b6eca;}
.el-form-custom .el-checkbox__label{color: #4b6eca;}
.el-form-custom .el-textarea__inner{border: 1px #9db9fa solid;color: #4b6eca;}
.el-form-custom  .el-input__count .el-input__count-inner{background: none;}
.el-form-custom  input::-webkit-input-placeholder {color: #b9b8b8;}
.el-form-custom  input:-moz-placeholder { color: #b9b8b8;}
.el-form-custom  input::-moz-placeholder { color: #b9b8b8;}
.el-form-custom  input:-ms-input-placeholder { color: #b9b8b8;}

.el-form-item-dk {display: block;}
.el-form-item-dk .el-form-item { display: inline-block}
.el-form-item-dk .el-form-item .el-form-item__content {margin-left: 0;}
.el-form-item-dk .el-input {width: 80px;}
.el-form-item-dk input {display: inline-block;width:80px; text-align: center;height: 36px;line-height: 36px;}
.el-form-item-dk .el-form-item {margin-bottom: 0 !important;}
.el-form-item-dk .el-input-group__prepend{padding: 0 10px; border:1px #9db9fa solid;border-right: 0;color: #3655A5;font-weight: 700;}
.el-form-item-dk .errorss .el-form-item__error {padding-left: 12px;}

.app-dialog-form .el-form-item__label {color: #1d397a;}
.app-dialog-form .el-input input {border: 1px #9db9fa solid;color: #4b6eca}
.app-dialog-form .el-textarea__inner {border: 1px #9db9fa solid;color: #4b6eca;}
/*pagination */
.app-pagination{text-align: right;margin-top: 20px;}
.app-pagination .el-pagination {border-radius: 4px;overflow: hidden; display: inline-block;padding: 0; border: 1px solid #3655A5;}
.app-pagination .el-pagination .el-pager li{background-color: #fff ;color: #1d397a; border-left: 1px solid #3655A5;color: #337ab7;float: left;padding: 0 12px; position: relative; text-decoration: none;margin: 0;border-radius: 0;}
.app-pagination .el-pagination .el-pager li.active{background: #3655A5!important;color: #fff;}
.app-pagination .el-pagination .el-pager li:hover{background: #fafafa;color: #3655a5;}
.app-pagination .el-pagination .more::before{line-height: 0!important}
.app-pagination .el-pagination .btn-prev{margin: 0;padding: 0;}
.app-pagination .el-pagination .btn-prev span{color: #1d397a; margin-left: 0;padding: 0 6px;border-top-right-radius: 4px; border-bottom-left-radius: 4px;  }
.app-pagination .el-pagination .btn-next{margin: 0;padding: 0;}
.app-pagination .el-pagination .btn-next span{color: #1d397a; margin-left: 0;padding: 0 6px; border-left: 1px solid #3655A5;border-right: 1px solid #3655A5; }
.app-pagination .el-pagination .el-pagination__total{color: #1d397a; background:none; padding-left: 6px; padding-right: 5px;padding-top: 1px; margin-right: 0}
.app-pagination .el-pagination .el-pager li.active:hover{color:#fff}
.app-pagination slot:first-child .btn-last{display: none}
.app-pagination .btn-next~slot>.btn-first{display: none;}
.app-pagination .btn-first{cursor: pointer; color: #1d397a;border-right: 1px solid #3655A5!important;}
.app-pagination .btn-last{cursor: pointer;color: #1d397a;border-right: 1px solid #3655A5!important;}
.app-pagination  .btn-next, .app-pagination  .btn-prev{background: none!important}
/* dialog */
.el-dialog{border-radius: 6px; margin-top: 10vh!important;}
.el-dialog__header{border-radius:6px 6px 0 0; background: #3655a5;text-align: center;padding:12px;}
.el-dialog__title{color: #fff;font-size: 18px;}
.el-dialog__headerbtn{top:14px; right:14px; background: #1d397a;border-radius: 100%;height: 22px;width: 22px;padding: 2px;color:#fff;}
.el-dialog__headerbtn .el-dialog__close {color: #fff;font-weight: 700;}
.el-dialog__headerbtn:hover{background: #fff;color:#1d397a!important }
.el-dialog__headerbtn:hover .el-dialog__close {color: #1d397a;}
.el-dialog .el-dialog__body{padding: 30px 30px 30px 20px;}
.el-dialog .el-dialog__footer{padding: 0 30px 30px 30px;}

.el-message-box-new {padding-bottom: 20px;border: #fff;}
.el-message-box-new  .el-message-box__header{border-radius:6px 6px 0 0; background: #3655a5;text-align: center;padding:12px;}
.el-message-box-new  .el-message-box__title{  color: #fff;font-size: 18px;}
.el-message-box-new  .el-message-box__headerbtn{top:12px;}
.el-message-box-new  .el-message-box__close{top:11px; right:14px; background: #1d397a;border-radius: 100%;height: 22px;width: 22px;padding: 2px;color:#fff;}
.el-message-box-new  .el-message-box__close:hover{background: #fff;color:#1d397a!important }
.el-message-box-new  .el-message-box__content{padding:30px 20px;}
.el-message-box-new  .el-message-box__btns{ text-align: center;}
.el-message-box-new  .el-message-box__btns  .el-button{padding: 9px 20px;font-size: 14px;border-radius: 4px;}
.el-message-box-new   .el-button--primary{background: #4b6eca!important;border-color: #4b6eca;}
/* layer */
.vl-notify-mask { background-color: #000;opacity: .5;}
.vl-notify .vl-notice-title{height: 49px!important;line-height:50px!important;border-radius:6px 6px 0 0; background: #3655a5!important;text-align: center;}
.vl-notice-title span{color: #fff;font-size: 18px;font-weight: 400}
.vl-notify.vl-notify-main{border: none;border-radius:6px!important;border:0!important}
.vl-notify .icon-remove {position: absolute;right: 13px!important;font-size: 14px;text-shadow: 0 1px 0 hsla(0,0%,100%,.5);top: 13px!important;color: #fff!important;background: #1d397a;border-radius: 100%; height: 22px;width: 22px; line-height: 22px;}
.vl-notify .icon-remove:hover{background: #fff;color:#1d397a!important }
/* el-menu-top */
.el-menu-top {text-align: center; background: #fff}
.el-menu-top .el-menu.el-menu--horizontal{border-bottom: none}
.el-menu-top ul {margin: 0 auto;display: block;}
.el-menu-top li {color: #1d397a;font-size: 16px;}
.el-menu-top .ptitle {outline:none;float: left;min-width: 120px; line-height: 61px;padding-left: 24px;padding-right: 60px;font-weight: 700;font-size: 18px;}
.el-menu-top .ptitle img {width: 18px;margin-right: 5px;display: inline-block;vertical-align: text-top;}
.el-menu-top1 .el-menu-item:hover{height: 61px; background-color: #4b6eca!important;border: none;color: #fff!important}
.el-menu-top .is-active {height: 61px; background-color: #4b6eca!important;border: none!important;color: #fff!important}
.el-menu-top .is-active .el-submenu__title:hover {background-color:#4b6eca!important;}
.el-menu-top .is-active .el-submenu__title{font-size: 16px; height: 61px; background-color: #4b6eca;color: #fff!important;border: none!important;}
.el-menu-top .is-active .el-submenu__title i{color: #fff}
.el-menu-top .el-submenu__title{font-size: 16px!important}
.el-message-local{background: #fff;}
.el-message-local .el-message__content{color: #000;}</style>