<template>
  <div id="security">
    <div class="el-menu-top">
      <el-menu mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-sec.png')" />安全管理
        </li>
      </el-menu>
    </div>
    <!-- list -->
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :model="searchForm" :inline="true">
            <el-form-item class="form-add-item">
              <el-button
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="addDialogEvents"
              >添加事件</el-button>
            </el-form-item>

            <el-form-item label="事件类型" style="display:none">
              <el-select v-model="searchForm.type">
                <el-option label="人员提交" :value="1"></el-option>
                <el-option label="机车提交" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <span v-if="searchForm.type==2">
              <el-form-item label="隐患类型">
                <el-select v-model="searchForm.danger_type">
                  <el-option
                    v-for="item in dangerTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="隐患判定">
                <el-select v-model="searchForm.danger_determine">
                  <el-option
                    v-for="item in this.dangerDetermineList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机车">
                <el-select v-model="searchForm.loco_id">
                  <el-option
                    v-for="item in this.trainList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="位置范围" class="el-form-item-inline">
                <el-input v-model="searchForm.start_location" autocomplete="off"></el-input>
                <b>~</b>
                <el-input v-model="searchForm.end_location" autocomplete="off"></el-input>
              </el-form-item>
            </span>
            <el-form-item label="发现时间段">
              <el-date-picker
                v-model="searchForm.start_time"
                :picker-options="pickerOptionsStart"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="开始时间"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="-">
              <el-date-picker
                v-model="searchForm.end_time"
                :picker-options="pickerOptionsEnd"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="结束时间"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="form-so">
              <label class="el-form-item__label"></label>
              <el-button size="small" icon="el-icon-search" @click="pageSearch" type="primary">查询</el-button>
              <el-button size="small" plain @click="resetSerach">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="dataList" :empty-text="dataListEmptyText">
            <el-table-column prop="id" label="序号" width="100"></el-table-column>
            <el-table-column prop="company" label="公司"></el-table-column>
            <el-table-column prop="title" label="事件名称"></el-table-column>
            <el-table-column prop="address" label="事件地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="type" label="事件类型">
              <template slot-scope="scope">{{scope.row.type==1?"人员提交":"机车提交"}}</template>
            </el-table-column>
            <el-table-column prop="danger_determine_name" label="隐患判定">
              <template slot-scope="scope">
                <span v-if="scope.row.danger_determine_name==''">未判定</span>
                <span v-else>{{scope.row.danger_determine_name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">新事件</span>
                <span v-else-if="scope.row.status==2">处理中</span>
                <span v-else>已完成</span>
              </template>
            </el-table-column>
            <el-table-column label="当前情况" prop="current_status"></el-table-column>
            <el-table-column prop="admin" label="提交者"></el-table-column>
            <el-table-column prop="create_time" label="发布时间">
              <template slot-scope="scope">
                <p v-html="changeTime(scope.row.create_time)"></p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="goDetail(scope.row.id)">查看</el-button>
                  <el-button class="btn-blue" size="mini" @click="goAssign(scope.row.id)">指派</el-button>
                  <el-button class="btn-red" size="mini" @click="goDetermine(scope.row.id)">隐患判定</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="dataList.length !== 0"
              layout="slot,prev, pager, next,slot,total"
              :page-size="this.page_size"
              :current-page="this.page_cur"
              :total="this.pageTotal"
              @current-change="pageChange"
              prev-text="上一页"
              next-text="下一页"
            >
              <button @click="pageToFirst" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="pageToLast" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
          </div>
        </div>
        <!-- end table -->
      </div>
      <div class="listpagedetail">
        <div class="detailleft">
          <div class="security-title">施工问题详情</div>
          <div class="app-page-container">
            <div class="steps-info">
              <div style="overflow:hidden">
                <h3>{{eventTitle}}</h3>
                {{eventDesc}}
              </div>
              <div class="imgs">
                <el-image
                  :preview-src-list="[item.src]"
                  v-for="item  in eventPictureList"
                  :key="item.id"
                  :src="item.src"
                ></el-image>
              </div>
            </div>
          </div>
        </div>
        <div class="detailright">
          <div class="security-title">处理进度</div>
          <div class="app-page-container">
            <div class="steps-section">
              <ul class="timeline">
                <li v-for="item in eventPeopleList" :key="item.id">
                  <div class="desc">{{item.description}}</div>
                  <div class="time">
                    {{item.user_name}}
                    <p>{{item.create_time}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- dialog -->
      <el-dialog
        width="900px"
        :close-on-click-modal="false"
        class="dialog-dangers"
        title="添加安全事件"
        :visible.sync="dialogFormEvent"
      >
        <div class="formbox">
          <el-form
            class="el-form-custom"
            label-width="120px"
            label-position="right"
            :model="formData"
            :rules="formRules"
            ref="formRulesRef"
          >
            <el-form-item label="添加事件公司：" prop="depart_id">
              <el-select
                v-model="formData.depart_id"
                placeholder="请选择公司"
                @change="selectCompanyList($event)"
              >
                <el-option
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="人员：" prop="admin_id">
              <el-select v-model="formData.admin_id" placeholder="请选择人员：">
                <el-option
                  v-for="item in this.objSelectLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="安全事件标题：" prop="title">
              <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="安全事件地址：" prop="address" class="textarea1">
              <el-input type="textarea" v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item label="安全事件描述：" prop="description">
              <el-input type="textarea" v-model="formData.description"></el-input>
            </el-form-item>
            <el-form-item label="相关图片：">
              <p style="color:#3655a5">最多可以上传5张图片，支持格式 jpg png gif，大小不能超过 2MB。</p>
              <!-- action="http://129.211.168.161/upload/uploadFile" 
                  :on-success="handleAvatarSuccess"
              -->
              <el-upload
                ref="uploadfive"
                class="uploader el-upload-list--picture-card"
                :action="uploadAction"
                :limit="5"
                list-type="picture-card"
                :auto-upload="true"
                :on-exceed="uploadExceed"
                :before-upload="uploadBefore"
                :on-success="uploadSuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="addEvent">信息确认无误，点击上传</el-button>
            </el-form-item>-->
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEvent = false">关闭</el-button>
          <el-button type="primary" @click="addEvent()">确定上传信息</el-button>
        </div>
      </el-dialog>

      <el-dialog
        width="480px"
        :close-on-click-modal="false"
        class="dialog-dangers"
        title="隐患类型设置"
        :visible.sync="diaDangerFormVisible"
      >
        <el-form class="el-form-custom">
          <el-form-item>
            <el-radio-group v-model="dangerTypeValue" class="my-radio">
              <el-radio
                v-for="item in dangerDetermineList"
                :key="item.id"
                :label="item.id"
              >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="blank"></div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="diaDangerFormVisible = false">关闭</el-button>
          <el-button type="primary" @click="setDetermineDialog()">确定</el-button>
        </div>
      </el-dialog>
      <!-- // -->
      <el-dialog
        width="700px"
        :close-on-click-modal="false"
        class="dialog-danger"
        title="指派人员"
        :visible.sync="diaPeopleFormVisible"
      >
        <el-form
          class="el-form-custom"
          :model="peopleData"
          :rules="peopleRules"
          ref="peopleRulesRef"
        >
          <el-form-item label="指派人员：" prop="user_id">
            <el-select v-model="peopleData.user_id">
              <el-option
                v-for="item in this.assignersList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="相关图片：">
            <p style="color:#3655a5">最多可以上传3张图片，支持格式 jpg png gif，大小不能超过 2MB。</p>
            <el-upload
              ref="uploadthree"
              class="uploaderthree el-upload-list--picture-card"
              :action="uploadAction"
              :limit="3"
              list-type="picture-card"
              :auto-upload="true"
              :before-upload="uploadBefore"
              :on-exceed="uploadThreeExceed"
              :on-success="uploadThreeSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item label="备注描述：" prop="remark">
            <el-input type="textarea" v-model="peopleData.remark"></el-input>
          </el-form-item>
          <div class="blank"></div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="diaPeopleFormVisible = false">关闭</el-button>
          <el-button type="primary" @click="saveAssignDialog()">确定</el-button>
        </div>
      </el-dialog>
      <!-- // -->
      <!-- end dialog -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.searchForm.end_time) {
            return (
              time.getTime() > new Date(this.searchForm.end_time).getTime()
            );
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.searchForm.start_time) {
            return (
              time.getTime() < new Date(this.searchForm.start_time).getTime()
            );
          }
        }
      },
      searchForm: {
        type: 1
      },
      uploadAction: this.hostURL + "/upload/uploadFile",
      dataList: [],
      dataListEmptyText: "无近七日内安全管理事件",
      companyList: [],
      trainList: [],
      dangerTypeList: [],
      dangerDetermineList: [],
      objSelectLists: [],
      formData: {},
      formRules: {
        depart_id: [
          { required: true, message: "请选择公司", trigger: "change" }
        ],
        admin_id: [
          { required: true, message: "请选择人员", trigger: "change" }
        ],
        title: [
          {
            required: true,
            message: "请输入安全事件标题2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" },
          {
            pattern: /(^\S+).*(\S+$)/,
            message: "开始和结尾不能有空格",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入安全事件地址2~100个字符",
            trigger: "blur"
          },
          { min: 2, max: 100, message: "长度在2到100个字符", trigger: "blur" },
          {
            pattern: /\s\S+|S+\s|\S/,
            message: "内容不能全是空格",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "请输入安全事件描述2~255个字符",
            trigger: "blur"
          },
          { min: 2, max: 255, message: "长度在2到255个字符", trigger: "blur" },
          {
            pattern: /\s\S+|S+\s|\S/,
            message: "内容不能全是空格",
            trigger: "blur"
          }
        ]
      },
      dialogFormEvent: false,
      dialogImageUrl: "",
      dialogVisible: false,
      eventTitle: "",
      eventDesc: "",
      eventPictureList: [],
      eventPeopleList: [],
      diaDangerFormVisible: false,
      dangerIdValue: 0,
      dangerTypeValue: "",
      diaPeopleFormVisible: false,
      peopleData: {},
      assignersList: [],
      peopleRules: {
        user_id: [
          { required: true, message: "请选择指派人员", trigger: "change" }
        ],
        remark: [
          {
            min: 2,
            max: 200,
            message: "请输入备注描述长度在2到200个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    //alert(document.location.hostname);
    this.defaultDate();
    this.getCompanyLists();
    // this.getTrainList();
    // this.getDangerType();
    this.getDangerDetermine();
    this.getDataList();
  },
  methods: {
    defaultDate() {
      let currentDate = new Date();
      let endTime = currentDate.setHours(23, 59, 59, 999);
      let starTime = new Date(
        currentDate.setDate(currentDate.getDate() - 7)
      ).setHours(0, 0, 0, 999);
      this.$set(this.searchForm, "start_time", new Date(starTime));
      this.$set(this.searchForm, "end_time", new Date(endTime));
    },
    //====列表数据
    getDataList() {
      let page = this.page_cur;
      //let type = this.searchForm.type;
      // let danger_type = this.searchForm.danger_type;
      // let danger_determine = this.searchForm.danger_determine;
      // let loco_id = this.searchForm.loco_id;
      // let start_location = this.searchForm.start_location;
      // let end_location = this.searchForm.end_location;
      let start_time = this.searchForm.start_time;
      let end_time = this.searchForm.end_time;
      this.request({
        url: "/security/getSecurityPages",
        method: "get",
        params: {
          page,
          start_time,
          end_time
        }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataList = data.data.data;
          this.page_cur = parseInt(data.data.current_page);
          this.pageTotal = data.data.total;
          this.page_size = data.data.per_page;
          this.page_total = data.data.last_page;
        }
      });
    },
    pageChange(value) {
      this.page_cur = value;
      this.getDataList();
    },
    pageToFirst() {
      this.pageChange(1);
    },
    pageToLast() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    pageSearch() {
      this.dataListEmptyText = "暂无数据";
      this.page_cur = 1;
      this.getDataList();
      this.goDetail(0);
    },
    resetSerach() {
      this.searchForm.start_time = "";
      this.searchForm.end_time = "";
      this.page_cur = 1;
      this.getDataList();
      this.goDetail(0);
    },
    //================事件表单操作
    addDialogEvents() {
      this.dialogFormEvent = true;
      this.$nextTick(() => {
        this.$refs["formRulesRef"].clearValidate();
      });
      let uploadImgs = document.getElementsByClassName("upimgitem");
      if (uploadImgs.length > 0) {
        this.$refs.uploadfive.clearFiles();
      }
      console.log("uploadImgs：" + uploadImgs.length);
    },
    //获取公司
    getCompanyLists() {
      this.request({
        url: "/apply/getCompanyLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.companyList = data.data;
        }
      });
    },
    selectCompanyList(val) {
      this.$set(this.formData, "admin_id", "");
      this.request({
        url: "/user/getUserByDepart",
        method: "get",
        params: { id: val, type: 1 }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.objSelectLists = data.data;
        }
      });
    },
    //获取机车
    getTrainList() {
      this.request({
        url: "/dispatch/getLocomotiveLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.trainList = data.data;
        }
      });
    },
    //获取隐患类型
    getDangerType() {
      this.request({
        url: "/security/getDangerType",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dangerTypeList = data.data.data.reverse();
        }
      });
    },
    //获取隐患判定
    getDangerDetermine() {
      this.request({
        url: "/security/getDangerDetermine",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dangerDetermineList = data.data.data.reverse();
        }
      });
    },
    //上传图片
    uploadExceed() {
      this.$message({
        type: "warning",
        message: `最多可以上传5张图片`
      });
    },
    uploadSuccess(res, file) {
      // let result= URL.createObjectURL(file.raw);
      console.log("图上传成功", res);
      let upload_list_li = document.getElementsByClassName("el-upload-list")[0]
        .children;
      if (res.data.url != "") {
        for (let i = 0; i < upload_list_li.length; i++) {
          let li_a = upload_list_li[i];
          let imgElement = document.createElement("img");
          imgElement.setAttribute("src", res.data.url);
          imgElement.setAttribute("class", "upimgitem");
          if (li_a.lastElementChild.nodeName !== "IMG") {
            li_a.appendChild(imgElement);
          }
        }
      }
    },
    uploadBefore(file) {
      var filename = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        filename === "GIF" ||
        filename === "gif" ||
        filename === "jpeg" ||
        filename === "jpg" ||
        filename === "JPG" ||
        filename === "png" ||
        filename === "PNG";
      const isLtM = file.size / 1024 / 1024 < 2;
      if (!extension) {
        this.$message({
          message: "上传图片只能是 jpg  png  gif 格式!",
          type: "error"
        });
        return false; //必须加上return false; 才能阻止
      }
      if (!isLtM) {
        this.$message({
          message: "上传图片大小不能超过 2MB!",
          type: "error"
        });
        return false;
      }
      return extension || isLtM;
    },
    //保存
    addEvent() {
      this.$refs["formRulesRef"].validate(valid => {
        if (valid) {
          let data = this.formData;
          let img_urls = [];
          let uls = document.getElementsByClassName("el-upload-list");
          for (let i = 0; i < uls.length; i++) {
            let imgs = uls[i].getElementsByClassName("upimgitem");
            for (let j = 0; j < imgs.length; j++) {
              //img_urls[i][j] = imgs[j].src;
              img_urls.push({
                src: imgs[j].src
              });
            }
          }
          this.formData.file = img_urls;
          this.request({
            url: "/security/addSecurity",
            method: "post",
            data
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.formData = {};
              this.dialogFormEvent = false;
              this.getDataList();
            } else {
              this.$message({
                showClose: true,
                message: "添加失败",
                type: "error"
              });
            }
          });
        }
      });
    },
    goDetail(id) {
      this.request({
        url: "/security/getSecurityDetail",
        method: "get",
        params: { id: id }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          if (id == 0) {
            this.eventTitle = "";
          } else {
            this.eventTitle = " 发起新事件：";
          }
          this.eventDesc = data.data.description;
          this.eventPictureList = data.data.file;
        }
      });
      this.request({
        url: "/security/getSecurtiyLogLists",
        method: "get",
        params: { sid: id }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.eventPeopleList = data.data;
        }
      });
    },
    //查看
    goDetermine(id) {
      this.diaDangerFormVisible = true;
      this.dangerIdValue = id;
    },
    setDetermineDialog() {
      var values = this.dangerTypeValue;
      if (values == "") {
        this.$message.error("请选择隐患类型");
        return false;
      }
      let id = this.dangerIdValue;
      let type = values;
      this.request({
        url: "/security/securityJudge",
        method: "post",
        data: { sid: id, type: type }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.$message({
            showClose: true,
            message: "设置成功",
            type: "success"
          });
          this.diaDangerFormVisible = false;
          this.addPageShow = false;
          this.listPageShow = true;
          this.getDataList();
        } else {
          this.$message.error("设置失败，请稍后再试");
        }
      });
    },
    //===============人员指派
    //上传图片
    uploadThreeExceed() {
      this.$message({
        type: "warning",
        message: `最多可以上传3张图片`
      });
    },
    uploadThreeSuccess(res, file) {
      console.log("图上传成功", res);
      let upload_list_li = document.getElementsByClassName("el-upload-list")[0]
        .children;
      if (res.data.url != "") {
        for (let i = 0; i < upload_list_li.length; i++) {
          let li_a = upload_list_li[i];
          let imgElement = document.createElement("img");
          imgElement.setAttribute("src", res.data.url);
          imgElement.setAttribute("class", "upimgitems");
          if (li_a.lastElementChild.nodeName !== "IMG") {
            li_a.appendChild(imgElement);
          }
        }
      }
    },
    //获取人员
    getAssigners() {
      this.request({
        url: "/security/getAssigners",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.assignersList = data.data;
        }
      });
    },
    //指派
    goAssign(id) {
      this.dialogFormEvent = false;
      this.diaPeopleFormVisible = true;
      this.dangerIdValue = id;
      this.getAssigners();
      this.$set(this.peopleData, "user_id", "");
      this.$set(this.peopleData, "remark", "");
      let uploadImgs = document.getElementsByClassName("upimgitems");
      if (uploadImgs.length > 0) {
        this.$refs.uploadthree.clearFiles();
      }
    },
    saveAssignDialog() {
      this.$refs["peopleRulesRef"].validate(valid => {
        if (valid) {
          let data = this.peopleData;
          let user_id = this.peopleData.user_id;
          let sid = this.dangerIdValue;
          let img_urls = [];
          let uls = document.getElementsByClassName("el-upload-list");
          for (let i = 0; i < uls.length; i++) {
            let imgs = uls[i].getElementsByClassName("upimgitems");
            for (let j = 0; j < imgs.length; j++) {
              img_urls.push({
                src: imgs[j].src
              });
            }
          }
          console.log("img_urls：" + img_urls);
          this.request({
            url: "/security/assignPeople",
            method: "POST",
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data: { user_id: user_id, sid: sid, file: img_urls }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.diaPeopleFormVisible = false;
              this.addPageShow = false;
              this.listPageShow = true;
              this.goDetail(this.dangerIdValue);
            } else {
              this.$message({
                showClose: true,
                message: "添加失败",
                type: "error"
              });
            }
          });
        }
      });
    },
    changeTime(time) {
      if (time !== null && time !== undefined && time !== "") {
        return (
          "<span style='display:block'>" +
          time.substring(0, 10) +
          "</span><span style='display:block'>" +
          time.substring(time.length - 8) +
          "</span>"
        );
      } else {
        return "";
      }
    }
    //
  }
};
</script>
<style>
.security-title {
  background: #3655a5;
  color: #fff;
  border-bottom: none !important;
  font-size: 18px;
  border-radius: 6px 6px 0 0;
  padding: 12px 0;
  text-align: center;
}
#security .formbox {
  padding: 0 10px;
}
#security .el-textarea {
  width: 100%;
}
#security .el-textarea__inner {
  height: 140px;
}
#security .textarea1 .el-textarea__inner {
  height: 80px;
}
#security .el-form-item-inline .el-input--medium {
  display: inline-block;
  width: 80px;
  text-align: center;
}
#security .el-form-item-inline input {
  display: inline-block;
  width: 80px;
  text-align: center;
}
#security .listpagedetail {
  margin-top: 20px;
  margin-bottom: 20px;
}
#security .listpagedetail .app-page-container {
  min-height: 300px;
}
#security .listpagedetail .detailleft {
  float: left;
  width: 49.2%;
}
#security .listpagedetail .detailright {
  float: right;
  width: 49.2%;
  height: 400px;
}
.steps-info {
  line-height: 28px;
}
.steps-info .imgs {
  width: 100%;
  overflow: hidden;
  display: block;
}
.steps-info .imgs img {
  width: 148px;
  height: 148px;
  margin-right: 10px;
  border-radius: 6px;
  border: 1px #f9f9f9 solid;
}
.steps-info .imgs .el-image__inner--center {
  left: 0;
  top: 0;
  transform: translate(0%, 0%);
}
.steps-info .el-icon-circle-close {
  color: #fff;
}
.steps-section {
  overflow-x: auto;
}
.timeline {
  width: 100%;
  height: auto;
  padding-bottom: 10px;
  font-size: 0;
  white-space: nowrap;
}

.timeline li {
  text-align: center;
  position: relative;
  display: inline-block;
  *display: inline;
  zoom: 1;
  width: auto;
  font-size: 16px;
  padding: 20px;
}
.timeline li .time {
  padding-top: 10px;
  color: #333;
  font-weight: 400;
}
.timeline li .time p {
  line-height: 31px;
}
.timeline li .time:before {
  content: "";
  display: block;
  position: absolute;
  width: 28px;
  height: 28px;
  top: 50px;
  margin-bottom: -4px;
  left: 50%;
  margin-left: -15px;
  border: 5px #898989 solid;
  background: #fff;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  border-radius: 100%;
  background-size: 10px 10px;
  z-index: 100;
}

.timeline li .time:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background: #898989;
  left: 0;
  top: 65px;
  margin-left: -2px;
  z-index: 99;
}
.timeline li:last-child .time:before {
  content: "";
  display: block;
  position: absolute;
  width: 28px;
  height: 28px;
  top: 50px;
  margin-bottom: -4px;
  left: 50%;
  margin-left: -15px;
  border: 5px #4b6eca solid;
  background: #fff;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  border-radius: 100%;
  background-size: 10px 10px;
  z-index: 999;
}

.timeline li .desc {
  color: #888;
  padding-bottom: 50px;
  font-size: 16px;
}

.uploader .el-upload {
  border: 1px dashed #9db9fa;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.uploader .upimgitem {
  width: 100%;
  margin-top: 10px;
}
.uploaderthree .el-upload {
  border: 1px dashed #9db9fa;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.uploaderthree .upimgitem {
  width: 100%;
  margin-top: 10px;
}

.dialog-danger .el-textarea__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  height: 100px;
}
.dialog-danger .el-textarea {
  width: 100% !important;
}
.dialog-danger .el-select {
  width: 100%;
}
.dialog-danger .el-form-item__label {
  width: 110px;
}
.dialog-danger .el-form-item__content {
  margin-left: 110px;
}
.my-radio .el-radio {
  margin-right: 15px !important;
}
.my-radio label{margin-bottom: 15px;}
.el-image-viewer__canvas img {
  width: auto !important;
  height: auto !important;
}
</style>
