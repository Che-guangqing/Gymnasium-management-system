<template>
  <div class="app-container" style="position: relative;">
    <el-carousel height="570px" :interval="2500" >
      <el-carousel-item v-for="item in imgList" :key="item.img">
        <img :src="item.img" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [
        {
          url: "#ff",
          img:
            "https://desk-fd.zol-img.com.cn/t_s1280x800c5/g5/M00/08/07/ChMkJ1agRwSIerAKACr39hNUoBEAAHg4AM06vkAKvgO668.jpg"
        },
        {
          url: "#rr",
          img:
            "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/08/07/ChMkJ1agRviIILqAACOcpK8kDpEAAHg3gMjH2sAI5y8728.jpg"
        },

        {
          url: "#l",
          img:
            "https://desk-fd.zol-img.com.cn/t_s1280x800c5/g5/M00/08/07/ChMkJlagRwKIYObHABMNhqI2ufgAAHg4AG4m9YAEw2e810.jpg"
        },
        {
          url: "#b",
          img:
            "https://desk-fd.zol-img.com.cn/t_s1280x800c5/g5/M00/08/07/ChMkJlagRwiIcPJ9AAjkYWqFIhAAAHg4QI9ZS8ACOR5097.jpg"
        },
        {
          url: "#g",
          img:
            "https://desk-fd.zol-img.com.cn/t_s1280x800c5/g5/M00/08/07/ChMkJ1agRxSILUgrACC6HyV8HKUAAHg4wKq-ucAILo3521.jpg"
        },
        {
          url: "#c",
          img:
            "https://desk-fd.zol-img.com.cn/t_s1280x800c5/g5/M00/08/07/ChMkJ1agRvuID-IhAERPxmqRZfAAAHg3wELc10ARE_e224.jpg"
        },
        {
          url: "#d",
          img:
            "https://desk-fd.zol-img.com.cn/t_s1280x800c5/g5/M00/08/07/ChMkJ1agRv-IHCuIAC1yHH8pNXkAAHg4AAAAAAALXI0137.jpg"
        },

        {
          url: "#e",
          img:
            "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/08/07/ChMkJlagRwyIBmixADZOiN6GK0MAAHg4gCs09UANk6g147.jpg"
        },

        {
          url: "#ee",
          img:
            "https://desk-fd.zol-img.com.cn/t_s1280x800c5/g5/M00/08/07/ChMkJ1agRw6INiOoAGHI0IR_f6IAAHg4gJksBAAYcjo256.jpg"
        }
      ]
    };
  }
};
</script>
<style scoped>
img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>></style>
