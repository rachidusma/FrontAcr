<template>
	<v-layout column>
		<v-row>
			<!-- Strart page Header -->
			<v-col cols="12">
				<v-breadcrumbs class="pa-0 ma-0" :items="[$t('user.breadCampItems[0]')]"></v-breadcrumbs>
			</v-col>

			<v-col cols="12" md="12">
				<v-row class="pa-4">
					<h1 class="title">{{ $t('user.title') }}</h1>
				</v-row>
			</v-col>
			<!-- End page Header -->

			<v-col cols="12">
				<v-card tile outlined class="pa-5">
					<v-row>
						<v-spacer />
						<v-text-field
							v-model="search_user"
							append-icon="mdi-magnify"
							:label="$t('filter')"
							single-line
							hide-details
							solo
							dense
							class="mb-4 pa-4"
							color="#336882"
						/>
					</v-row>
					<v-data-table
						:headers="headers"
						:items="userlist"
						sort-by="name"
						class="elevation-1"
						:search="search_user"
						loading="true"
						:footer-props="{
                itemsPerPageText: $t('rowsForTable')
              }"
						:loading-text="$t('loading')"
					>
						<template v-slot:item.fullname="{ item }">{{item.name}} {{item.lastname}}</template>

						<template v-slot:item.admin="{ item }">
							<v-switch
								v-model="item.admin"
								@mousedown="changeAdminRole(item)"
								:disabled="item.block ? true : false"
							/>
						</template>
						<template v-slot:item.block="{ item }">
							<v-switch color="red" v-model="item.block" @mousedown="blockUser(item)" />
						</template>
						<template v-slot:item.actions="{ item }">
							<v-btn fab dark small color="cyan">
								<v-icon
									small
									dark
									@click="editUser(item)"
									:disabled="item.block ? true : false"
								>mdi-checkbox-marked-outline</v-icon>
							</v-btn>
							<v-btn fab dark small color="red">
								<v-icon
									small
									dark
									@click="deleteUser(item)"
									:disabled="item.block ? true : false"
								>mdi-delete</v-icon>
							</v-btn>
						</template>
					</v-data-table>
				</v-card>
			</v-col>
		</v-row>

		<!-- This modal is for admin role -->
		<div justify="center">
			<v-dialog v-model="role_change_flag" persistent max-width="260">
				<v-card>
					<v-card-title class="headline d-flex justify-center">
						<div class="d-flex flex-no-wrap">
							<v-icon large color="orange darken-2">mdi-alert</v-icon>
							<div class="ml-3 text-center">{{ $t('user.adminModal.title') }}</div>
						</div>
					</v-card-title>
					<v-card-actions>
						<v-spacer />
						<v-btn color="green darken-1" text @click=" role_change_flag = false">
							<v-icon>mdi-close-circle-outline</v-icon>
						</v-btn>
						<v-btn color="green darken-1" text @click="adminRoleAxios()">
							<v-icon>mdi-checkbox-marked-circle-outline</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
		<!-- warnning role part -->

		<!-- This modal is for delete part -->
		<div justify="center">
			<v-dialog v-model="user_delete_flag" persistent max-width="260">
				<v-card>
					<v-card-title class="headline d-flex justify-center">
						<div class="d-flex flex-no-wrap">
							<v-icon large color="red darken-2">mdi-delete-variant</v-icon>
							<div class="ml-3 text-center">{{ $t('user.deleteUser.title') }}</div>
						</div>
					</v-card-title>
					<v-card-actions>
						<v-spacer />
						<v-btn color="green darken-1" text @click="user_delete_flag = false, userID = ''">
							<v-icon>mdi-close-circle-outline</v-icon>
						</v-btn>
						<v-btn color="green darken-1" text @click="deleteAxios(userID)">
							<v-icon>mdi-checkbox-marked-circle-outline</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
		<!-- end delete part -->

		<!-- This modal is for block part -->
		<div justify="center">
			<v-dialog v-model="user_block_flag" persistent max-width="280">
				<v-card>
					<v-card-title class="headline d-flex justify-center">
						<div class="d-flex flex-no-wrap">
							<v-icon large color="red darken-2">mdi-block-helper</v-icon>
							<div class="ml-3 text-center">{{ $t('user.deleteUser.title') }}</div>
						</div>
					</v-card-title>
					<v-card-actions>
						<v-spacer />
						<v-btn color="green darken-1" text @click="user_block_flag = false, userID = ''">
							<v-icon>mdi-close-circle-outline</v-icon>
						</v-btn>
						<v-btn color="green darken-1" text>
							<v-icon @click="userBlockAxios()">mdi-checkbox-marked-circle-outline</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
		<!-- end block part -->

		<!-- This part is for edit part -->
		<v-dialog v-model="user_edit_flag" persistent max-width="600px">
			<v-card>
				<v-card-title>
					<span class="overline">{{ $t('user.editModal.title') }}</span>
				</v-card-title>
				<v-divider />
				<v-card-text>
					<v-container>
						<v-row>
							<p class="overline">{{ $t('user.editModal.subtitle') }}</p>
							<v-row>
								<v-col cols="6" sm="6">
									<template>
										<v-switch v-model="useredit.admin" :label="$t('user.editModal.switches.userRole')"></v-switch>
									</template>
								</v-col>
								<v-col cols="6" sm="6">
									<template>
										<v-switch v-model="useredit.block" :label="$t('user.editModal.switches.userBlock')"></v-switch>
									</template>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" sm="6">
									<v-text-field
										:label="$t('user.editModal.fname')"
										outlined
                    dense
										color="#336882"
										v-model="useredit.name"
									/>
								</v-col>
								<v-col cols="12" sm="6">
									<v-text-field
										:label="$t('user.editModal.lname')"
										outlined
                    dense
										color="#336882"
										v-model="useredit.lastname"
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" sm="12" md="12">
									<v-text-field
										:label="$t('email')"
										outlined
                    dense
										type="email"
										color="#336882"
										v-model="useredit.email"
									/>
								</v-col>
								<v-col cols="12" sm="12" md="12">
									<v-text-field
										:label="$t('user.editModal.tel')"
										outlined
                    dense
										type="text"
										color="#336882"
										v-model="useredit.telnumber"
									/>
								</v-col>
							</v-row>
						</v-row>
					</v-container>
					<small>{{ $t('required') }}</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn color="blue darken-1" text @click="user_edit_flag = false">Close</v-btn>
					<v-btn color="blue darken-1" text @click="userDetailUpdateAxios()">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<!-- End edit part -->
	</v-layout>
</template>

<script>
export default {
	middleware: "auth",
	layout: "admin",

	data() {
		return {
			search_user: "",

			role_change_flag: false,
			user_delete_flag: false,
			user_edit_flag: false,
			user_block_flag: false,

			userID: "", // current userID

			search: "",
			headers: [
				{ text: this.$t("user.tableHeaders.id"), value: "_id" },
				{ text: this.$t("user.tableHeaders.name"), value: "fullname" },
				{ text: this.$t("user.tableHeaders.email"), value: "email" },
				{ text: this.$t("user.tableHeaders.tel"), value: "telnumber" },
				{ text: this.$t("user.tableHeaders.dor"), value: "register_date" },
				{ text: this.$t("user.tableHeaders.admin"), value: "admin" },
				{ text: this.$t("user.tableHeaders.block"), value: "block" },
				{
					text: this.$t("user.tableHeaders.actions"),
					value: "actions",
					sortable: false
				}
			],

			userlist: [], // total user
			useredit: {}, // edit user
			userrole: {}, // user role
			userblock: {}, // user block

			simpleuserblock: {
				admin: "",
				block: "",
				email: "",
				lastname: "",
				name: "",
				password: "",
				register_date: "",
				__v: "",
				_id: ""
			}
		};
	},

	beforeMount() {
		this.getAllUsers();
	},

	methods: {
		async getAllUsers() {
			await this.$axios
				.post("/users/admin/", { admin: this.$auth.user.admin })
				.then(res => {
					res.data.forEach(e => {
						e.register_date = new Date(e.register_date)
							.toISOString()
							.substring(0, 10);
					});
					this.userlist = res.data;
					console.log("customers_list", res);
				});
		},

		// This functions is for adminRole
		changeAdminRole(item) {
			this.userrole = Object.assign({}, item);
			this.role_change_flag = true;
		},
		async adminRoleAxios() {
			this.role_change_flag = false;
			this.userrole.admin = !this.userrole.admin;
			await this.$axios
				.$patch(`/users/${this.userrole._id}`, this.userrole)
				.then(async res => {
					await this.getAllUsers();
					this.userrole = null;
				})
				.catch(err => console.log(err));
		},
		// End for Role

		// This part is for editing user
		editUser(item) {
			this.useredit = Object.assign({}, item);
			console.log(this.useredit);
			this.user_edit_flag = true;
		},
		async userDetailUpdateAxios() {
			console.log("edit user", this.useredit);
			await this.$axios
				.$patch(`/users/${this.useredit._id}`, this.useredit)
				.then(async res => {
					await this.getAllUsers();
					this.user_edit_flag = false;
					this.useredit = Object.assign({}, this.simpleuserblock);
				})
				.catch(err => console.log(err));
		},
		// End edit

		// Delete user
		deleteUser(item) {
			this.userID = item._id;
			this.user_delete_flag = true;
		},
		async deleteAxios(id) {
			console.log(id);
			await this.$axios
				.$delete(`/users/${id}`)
				.then(res => {
					console.log(res);
					this.user_delete_flag = false;
					this.userID = "";
					this.getAllUsers();
				})
				.catch(err => console.log(err));
		},
		// End delete

		// Block user part
		blockUser(item) {
			this.userblock = Object.assign({}, item);
			this.user_block_flag = true;
		},
		async userBlockAxios() {
			this.user_block_flag = false;
			this.userblock.block = !this.userblock.block;
			await this.$axios
				.$patch(`/users/${this.userblock._id}`, this.userblock)
				.then(async res => {
					await this.getAllUsers();
					this.userblock = null;
				})
				.catch(err => console.log(err));
		},
		// End Block user part

		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		save() {
			this.close();
		}
	}
};
</script>
