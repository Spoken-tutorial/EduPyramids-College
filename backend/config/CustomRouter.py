# Apps using spoken db
APPS_TO_SPOKEN = {
    "auth", # users, groups, permissions
    "contenttypes",  # required by auth/permissions
    "sessions",      # if you use Django sessions (admin, etc.)
    "admin",         # Django admin tables
    # add "authtoken" if you use DRF TokenAuthentication

}

class CustomRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == "spoken":
            print(f"\033[92m spoken \033[0m")
            # print(f"\033[92m custom router ******** \033[0m")
            return "spoken"
        if model._meta.app_label in APPS_TO_SPOKEN:
            print(f"\033[92m apps_to_spoken \033[0m")
            return "spoken"
        #     return "otherdb"
       
        return None
        

    def db_for_write(self, model, **hints):
        if model._meta.app_label == "spoken":
            return None
        if model._meta.app_label in APPS_TO_SPOKEN:
            return "spoken"
        # if model._meta.app_label == "otherapp":
        #     return "otherdb"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        # Allow relations within same app/db
        if obj1._meta.app_label == obj2._meta.app_label:
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == "spoken":
            return False
        if app_label in APPS_TO_SPOKEN:
            return "spoken"
        # if app_label == "otherapp":
        #     return db == "otherdb"
        return None