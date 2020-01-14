import Vue from "vue";
import VueRouter from "vue-router";

import HomeComponent from "../views/Home.vue";
import SignupComponent from "../views/Signup.vue";
import LoginComponent from "../views/Login.vue";
import MyWordsComponent from "../views/MyWords.vue";
import SettingsComponent from "../views/Settings.vue";
import ResetPasswordComponent from "../views/ResetPassword.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: { name: "home" } },
  {
    path: "/home",
    component: HomeComponent,
    meta: { title: "Home" },
    name: "home"
  },
  {
    path: "/register",
    component: SignupComponent,
    meta: { title: "New User Registration" },
    name: "signup"
  },
  {
    path: "/login",
    component: LoginComponent,
    meta: { title: "Login" },
    name: "login"
  },
  {
    path: "/reset-password",
    props: true,
    component: ResetPasswordComponent,
    meta: { title: "Reset Password" },
    name: "reset-password"
  },
  {
    path: "/my-words",
    component: MyWordsComponent,
    meta: { title: "My Words" },
    name: "my-words"
  },
  {
    path: "/settings",
    component: SettingsComponent,
    meta: { title: "Profile Settings" },
    name: "settings"
  },
  {
    path: "*",
    redirect: { name: "home" }
  }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
