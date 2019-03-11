const mutations = {
  back_show(state, flag) {
    state.back_flag = flag
  },
  set_head(state, text) {
    state.header_text = text
  },
  set_user(state, user_info) {
    state.user = user_info.user;
    state.user_password = user_info.password;
    state.user_img = user_info.img;
    localStorage.user = user_info.user;
    localStorage.password = user_info.password;
    localStorage.user_img = user_info.img;
  },
  set_login(state, login_info) {
    state.login_flag = login_info.login_flag;
    state.is_Admin = login_info.is_admin;
    localStorage.login_flag = login_info.login_flag;
    localStorage.is_Admin = login_info.is_admin;
  },
  set_autoUpdate(state, flag) {
    state.auto_update = flag;
  },
  set_userImg(state, imgPath) {
    state.user_img = imgPath;
    localStorage.user_img = imgPath;
  }
};

export default mutations
