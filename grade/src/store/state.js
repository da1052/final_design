const state = {
  back_flag: false,
  login_flag: eval(localStorage.login_flag.toLowerCase()) || false,
  user: localStorage.user == 'null' ? null : localStorage.user || null,
  user_password: localStorage.password == 'null' ? null : localStorage.password || null,
  header_text: null,
  is_Admin: eval(localStorage.is_Admin.toLowerCase()) || false,
  user_img: localStorage.user_img == 'null' || localStorage.user_img == 'undefined' ? null : localStorage.user_img || null,
  auto_update: false
}

export default state
