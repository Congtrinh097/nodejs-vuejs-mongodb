<template>
  <div>
    <div class="row">
      <div class="col-md-6 col-lg-4 margin_bottom_30">
        <b-overlay :show="loading">
          <app-dashboard-widget
            class="blue2_bg"
            text="Users"
            :value="summary.userCount"
            icon="object-group"
            :to="{ name: 'users' }"
          />
        </b-overlay>
      </div>
      <div class="col-md-6 col-lg-4 margin_bottom_30">
        <b-overlay :show="loading">
          <app-dashboard-widget
            class="blue2_bg"
            text="Videos"
            :value="summary.videoCount"
            icon="layer-group"
            :to="{ name : 'stacks' }"
          />
        </b-overlay>
      </div>
    </div>
    <div
      v-if="isWithoutOrganization"
      class="center"
    >
      <div class="error_page">
        <div class="center">
          <img
            alt="#"
            class="img-responsive"
            src="@/assets/images/waving-hand-sign.png"
          >
        </div>
        <br>
        <h3>Hi there !</h3>
        <p>It seems that you're not a member of a organization yet. Ask your admin to add you a organization !</p>
        <p>Until then, you'll only be able to use public modules.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import AppDashboardWidget from '@/pages/dashboard/dashboard-widget.vue';
  import { getSummary } from '@/shared/api/dashboard-api';

  export default {
    name: 'AppDashboard',
    components: {
      AppDashboardWidget,
    },
    data: () => ({
      loading: true,
      summary: { userCount: 0, videoCount: 0 },
    }),
    computed: {
      ...mapState('session', ['user']),
      isWithoutOrganization() {
        return !this.user.admin && !this.user.organization;
      },
    },
    async created() {
      this.summary = await getSummary();
      this.loading = false;
    },
  };
</script>
