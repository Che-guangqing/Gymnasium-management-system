<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar", "roles"]),
    // routes() {
    //   console.log(this.roles)
    //   // console.log(this.$router.options.routes)
    //   return this.$router.options.routes
    // },
    routes() {
      let route = this.$router.options.routes;

      let newRoute = [];
      // console.log(route, "路由表");
      // console.log(this.roles, "我的身份");
      if (this.roles && this.roles.length) {
        route.forEach(item => {
          if (item.meta && item.meta.role) {
            item.meta.role.forEach(ite => {
              if (this.roles[0]) {
                if (ite === this.roles[0]) newRoute.push(item);
              }
            });
          }
        });
      }

      // console.log(newRoute, "我可以展示的路由");
      return newRoute;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
