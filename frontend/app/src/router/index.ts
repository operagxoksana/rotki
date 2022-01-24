/* istanbul ignore file */

import Vue from 'vue';
import Router from 'vue-router';
import { Routes } from '@/router/routes';

Vue.use(Router);

const base = process.env.VUE_APP_PUBLIC_PATH ? window.location.pathname : '/';
const isDocker = process.env.VUE_APP_DOCKER;

export default new Router({
  mode: isDocker ? 'hash' : 'history',
  base,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      setTimeout(() => {
        const element = document.getElementById(to.hash.replace(/#/, ''));
        if (element && element.scrollIntoView) {
          element.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }
      }, 500);

      return { selector: to.hash };
    } else if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '*',
      redirect: Routes.ROOT
    },
    {
      path: Routes.DASHBOARD,
      alias: Routes.ROOT,
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: Routes.NFTS,
      name: 'nfts',
      component: () => import('../views/Nft.vue')
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../views/Statistics.vue')
    },
    {
      path: Routes.PROFIT_LOSS_REPORTS,
      component: () => import('../views/reports/ProfitLossReports.vue')
    },
    {
      path: Routes.PROFIT_LOSS_REPORT,
      component: () => import('../views/reports/ProfitLossReport.vue'),
      meta: {
        canNavigateBack: true
      }
    },
    {
      path: '/history',
      component: () => import('../views/history/History.vue'),
      children: [
        {
          path: '',
          name: 'trades',
          redirect: 'trades',
          component: () => import('../views/history/trades/TradeHistory.vue')
        },
        {
          path: 'trades',
          component: () => import('../views/history/trades/TradeHistory.vue')
        },
        {
          path: 'deposits-withdrawals',
          component: () =>
            import(
              '../views/history/deposits-withdrawals/DepositsWithdrawals.vue'
            )
        },
        {
          path: 'transactions',
          component: () =>
            import('../views/history/transactions/Transactions.vue')
        },
        {
          path: Routes.HISTORY_LEDGER_ACTIONS,
          component: () =>
            import('../views/history/ledger-actions/LedgerActions.vue')
        },
        {
          path: Routes.HISTORY_GITCOIN,
          component: () => import('../views/history/GitcoinGrants.vue')
        }
      ]
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings/Settings.vue'),
      children: [
        {
          path: 'general',
          component: () => import('../views/settings/GeneralSettings.vue')
        },
        {
          path: 'accounting',
          component: () => import('../views/settings/AccountingSettings.vue')
        },
        {
          path: 'data-security',
          component: () => import('../views/settings/UserSecuritySettings.vue')
        },
        {
          path: 'modules',
          component: () => import('../views/settings/ModuleSettings.vue')
        }
      ]
    },
    {
      path: '/settings/general',
      name: 'general-settings',
      component: () => import('../views/settings/Settings.vue')
    },
    {
      path: '/settings/api-keys',
      name: 'api-keys',
      component: () => import('../views/settings/ApiKeys.vue'),
      children: [
        {
          path: 'rotki-premium',
          component: () => import('../components/settings/PremiumSettings.vue')
        },
        {
          path: 'exchanges',
          component: () =>
            import('../components/settings/api-keys/ExchangeSettings.vue')
        },
        {
          path: 'external-services',
          component: () =>
            import('../components/settings/api-keys/ExternalServices.vue')
        }
      ]
    },
    {
      path: '/import',
      name: 'import',
      component: () => import('../views/ImportData.vue')
    },
    {
      path: '/accounts-balances',
      component: () => import('../views/AccountsBalances.vue'),
      children: [
        {
          path: '',
          name: 'accounts-balances',
          redirect: 'blockchain-balances'
        },
        {
          path: 'blockchain-balances',
          component: () =>
            import('../components/accounts/BlockchainBalances.vue')
        },
        {
          path: 'exchange-balances/',
          component: () =>
            import('../components/accounts/exchanges/ExchangeBalances.vue')
        },
        {
          path: 'exchange-balances/:exchange',
          component: () =>
            import('../components/accounts/exchanges/ExchangeBalances.vue'),
          props: true
        },
        {
          path: Routes.NON_FUNGIBLE,
          component: () =>
            import('../views/accountsbalances/NonFungibleBalancePage.vue')
        },
        {
          path: 'manual-balances',
          component: () =>
            import('../components/accounts/manual-balances/ManualBalances.vue')
        }
      ]
    },
    {
      path: Routes.DEFI,
      component: () => import('../views/defi/DecentralizedFinance.vue'),
      children: [
        {
          path: '',
          redirect: Routes.DEFI_OVERVIEW
        },
        {
          path: Routes.DEFI_OVERVIEW,
          component: () => import('../views/defi/DecentralizedOverview.vue')
        },
        {
          path: Routes.DEFI_DEPOSITS,
          component: () => import('../views/defi/DecentralizedDeposits.vue'),
          children: [
            {
              path: '',
              redirect: Routes.DEFI_DEPOSITS_PROTOCOLS
            },
            {
              path: Routes.DEFI_DEPOSITS_PROTOCOLS,
              component: () => import('../views/defi/deposits/Protocols.vue')
            },
            {
              path: Routes.DEFI_DEPOSITS_LIQUIDITY,
              component: () => import('../views/defi/deposits/Liquidity.vue'),
              children: [
                {
                  path: '',
                  redirect: Routes.DEFI_DEPOSITS_LIQUIDITY_UNISWAP
                },
                {
                  path: Routes.DEFI_DEPOSITS_LIQUIDITY_UNISWAP,
                  component: () =>
                    import('../components/defi/uniswap/Uniswap.vue')
                },
                {
                  path: Routes.DEFI_DEPOSITS_LIQUIDITY_BALANCER,
                  component: () =>
                    import('../components/defi/balancer/Balancer.vue')
                },
                {
                  path: Routes.DEFI_DEPOSITS_LIQUIDITY_SUSHISWAP,
                  component: () =>
                    import('../components/defi/sushiswap/Sushiswap.vue')
                }
              ]
            }
          ]
        },
        {
          path: Routes.DEFI_LIABILITIES,
          name: 'defi-liabilities',
          component: () => import('../views/defi/DecentralizedBorrowing.vue')
        },
        {
          path: Routes.DEFI_DEX_TRADES,
          component: () => import('../views/defi/DexTrades.vue')
        },
        {
          path: Routes.DEFI_AIRDROPS,
          component: () => import('../views/defi/Airdrops.vue')
        }
      ]
    },
    {
      path: Routes.STAKING,
      component: () => import('../views/staking/StakingPage.vue'),
      props: route => ({ location: route.params.location ?? null })
    },
    {
      path: Routes.ASSETS,
      component: () => import('../views/Assets.vue'),
      meta: {
        canNavigateBack: true
      },
      props: true
    },
    {
      path: Routes.PRICE_MANAGER,
      component: () => import('../views/PriceManager.vue'),
      meta: {
        canNavigateBack: true
      },
      props: true
    },
    {
      path: Routes.ASSET_MANAGER,
      component: () => import('../views/AssetManager.vue'),
      props: route => ({ identifier: route.query.id ?? null })
    },
    ...(process.env.NODE_ENV === 'development'
      ? [
          {
            path: '/playground',
            name: 'playground',
            component: () => import('../views/dev/Playground.vue')
          }
        ]
      : [])
  ]
});
