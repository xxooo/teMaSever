const commonFn = {
  j2s(obj) {
    return JSON.stringify(obj)
  },
  closeGlobalLoading() {
    setTimeout(() => {
      store.dispatch('showLoading', false)
    }, 0)
  },
  openGlobalLoading() {
    setTimeout(() => {
      store.dispatch('showLoading', true)
    }, 0)
  },
  cloneJson(obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  copy:obj=>JSON.parse(JSON.stringify(obj)),
  toastMsg(type, msg) {
    switch (type) {
      case 'success':
        bus.$notify({
          message: msg,
          type: 'success'
        })
        break
      case 'warning':
        bus.$notify({
          message: msg,
          type: 'warning'
        })
        break
      case 'error':
        bus.$notify.error(msg)
        break
    }
  },
  confirm(subject, callback) {
    const h = bus.$createElement;
    let en = Lockr.get('locale') == 'en-US'
    bus.$msgbox({
      title: en ? 'Tips' : '提示',
      message: h('p', null, [
        h('span', null, (arguments.length > 2 ? '' : (en ? 'Are you sure you want to remove this ' : '确定删除')) + subject),
      ]),
      showCancelButton: true,
      confirmButtonText: en ? 'Ok' : '确定',
      cancelButtonText: en ? 'Cancel' : '取消',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          callback && callback()
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = en ? 'Executing...' : '执行中';
          done();
          setTimeout(() => {
            instance.confirmButtonLoading = false;
          }, 300);
        } else {
          done();
        }
      }
    });
  },
  clearVuex(cate) {
    store.dispatch(cate, [])
  },
  getHasRule(val) {
    const moduleRule = 'admin'
    let userInfo = Lockr.get('userInfo')
    if (userInfo.id == 1) {
      return true
    } else {
      let authList = moduleRule + Lockr.get('authList')
      return _.includes(authList, val)
    }
  },
  loginOut: () => { // 退出登录
    axios.post(`${globalConfig.api}/user-org/common/logout?token=` + store.state.token).then((result) => {
      if (result.data.code === 0) {
        _g.loginOut2()
      }
    })
  },
  loginOut2: () => { // 退出登录
    Cookies.remove('token')
    Lockr.rm('token')
    store.dispatch('setLogin', false)
    // Lockr.rm('token')
    // Lockr.rm('user')
    _g.toastMsg('success', appLang[Lockr.get('locale')]['app']['logout'])
    setTimeout(() => {
      router.replace('/')
    }, 2000)
  },
  getParam: (url, id) => {
    url = url + "";
    let regstr = "/(\\?|\\&)" + id + "=([^\\&]+)/";
    let reg = eval(regstr); //eval可以将 regstr字符串转换为 正则表达式
    let result = url.match(reg); //匹配的结果是：result[0]=?sid=22 result[1]=sid result[2]=22。所以下面我们返回result[2]

    if (result && result[2]) {
      return result[2];
    }
  },
  t: (arr) => {
    if (store.state.locale == 'En') {
      return arr.join(' ')
    } else {
      return arr.join('')
    }
  },
}

export default commonFn
