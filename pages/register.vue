<template>
	<v-row justify="center" align-content="center">
		<v-col cols="12" md="5" sm="12" style="padding-top : 30px">
			<v-row align="center" justify="center">
				<v-col>
					<v-container>
						<h6 class="display-2 bold" align="center" style="color :#336882">Create Account</h6>
						<div class="thank">
							<p>Thank you for registration with us , your account have been created</p>
							<p>
								<nuxt-link to="/" class="link">Signin</nuxt-link>into your account
							</p>
						</div>
					</v-container>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<style  scoped>
.thank {
	border: 1px solid #336882;
	border-radius: 4px;
	padding: 15px;
	margin-top: 50px;
}
.link {
	text-decoration: none;
}
</style>