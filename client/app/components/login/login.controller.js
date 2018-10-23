class LoginController {
    constructor($http,$timeout,$location) {
        'ngInject';
        this.emails = '';
        this.password = '';
        this.$http = $http;
        this.$timeout = $timeout;
        this.error = [];
        this.allEroors = 0;
        this.ok = 0;
        this.$location = $location;
        this.passwordRequire = 0;
        this.emailRequire=0;
        this.button = 0;
        this.loading = false;
this.created()
    }
    created(){
      if(sessionStorage.getItem('token') != null){
        this.$location.path('/home')
      }
    }
    signIn(value){
        this.error = []
        this.valids(!this.password, 'password', "Password required");
        this.valids(!this.emails, 'email', "Email required");
        if (this.error.length> 0){
            this.allEroors = 1;
            this.button = 1;
        } else {
            this.sent()
        }
        this.setTime()
    }
    sent(){
        this.$http.post('http://ec2-54-88-87-181.compute-1.amazonaws.com:8889/login',{
            email: this.emails,
            password: this.password
        }).
        then((response)=>  {
            this.loading = false
            sessionStorage.setItem('token',response.data.token);
            this.ok = 1;
            let it = this;
            this.$timeout(function () {
                it.$location.path('/home')
            },1000)
        })
        .catch((response)=> {
            this.loading = false;
            let email = response.response.data.email;
            if(email != null && Array.isArray(email)){
                for(let i = 0; i < email.length;i++){
                  this.error.push(email[i])
                  this.allEroors = 1;
                  this.emailRequire = 1;
                  this.button = 1;
                }
            }
            if (response.response.data.error != undefined){
                this.error.push(response.response.data.error)
                this.allEroors = 1;
                this.button = 1;
            }
            this.button = 1;
        });
    }
    valids(valid, name, textEror){
        if (valid) {
            this.error.push(textEror);
            name == 'password'?this.passwordRequire = 1 : this.emailRequire = 1
        }
    }
    setTime(){
        let it = this
        this.$timeout(function () {
            it.allEroors = 0;
            it.ok = 0;
            it.passwordRequire = 0;
            it.emailRequire=0;
            it.button = 0;
        }, 2000);
    }
}

export default LoginController;
