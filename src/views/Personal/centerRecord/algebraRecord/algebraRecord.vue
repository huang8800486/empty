<template>
  <div class="assets_record_wrap">
    <Bsoon />
    <!-- <div class="record_detail_wrap recode_inner">
      <div class="text_title">
        <h3>累计收益</h3>
        <h4>0.00 USDT</h4>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts" name="">
  const secondNav = computed(() => {
    return ['收益记录', '团队详情'];
  });
  const currentIndex = ref(0);
  const switchRecord = (index: number) => {
    currentIndex.value = index;
  };
</script>
