<script setup lang="ts">
const showGraphRangeSelector = ref<boolean>(true);
const { showGraphRangeSelector: enabled } = storeToRefs(useFrontendSettingsStore());

onMounted(() => {
  set(showGraphRangeSelector, get(enabled));
});

const { t } = useI18n();
</script>

<template>
  <SettingsOption
    #default="{ error, success, update }"
    setting="showGraphRangeSelector"
    frontend-setting
  >
    <RuiSwitch
      v-model="showGraphRangeSelector"
      class="general-settings__fields__show-graph-range-selector"
      :label="t('frontend_settings.graph_basis.range_selector.label')"
      :success-messages="success"
      :error-messages="error"
      color="primary"
      @update:model-value="update($event)"
    />
  </SettingsOption>
</template>
