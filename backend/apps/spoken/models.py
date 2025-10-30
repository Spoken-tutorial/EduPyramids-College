# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

# Creation Models ---------------------------------------------------------------------------



class CreationDomain(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(unique=True, max_length=255)
    created = models.DateTimeField()
    updated = models.DateTimeField()
    show_on_homepage = models.IntegerField()
    icon = models.ImageField(upload_to='domain_icons/', null=True, blank=True)
    description = models.TextField()
    is_active = models.BooleanField()
    
    class Meta:
        managed = False
        db_table = 'creation_domain'


class CreationFosscategory(models.Model):
    id = models.IntegerField(primary_key=True)
    foss = models.CharField(unique=True, max_length=255)
    description = models.TextField()
    status = models.IntegerField()
    # user = models.ForeignKey('AuthUser', models.DO_NOTHING)
    user_id = models.IntegerField(db_column='user_id')
    created = models.DateTimeField()
    updated = models.DateTimeField()
    is_learners_allowed = models.IntegerField()
    show_on_homepage = models.PositiveSmallIntegerField()
    is_translation_allowed = models.IntegerField()
    available_for_nasscom = models.IntegerField()
    available_for_jio = models.IntegerField()
    csc_dca_programme = models.IntegerField()
    credits = models.PositiveSmallIntegerField()
    is_fossee = models.IntegerField()
    icon = models.ImageField(upload_to='foss_icons/', null=True, blank=True)
    domain = models.ManyToManyField(CreationDomain, related_name='fosscategories', through='CreationFosscategoryDomain')

    class Meta:
        managed = False
        db_table = 'creation_fosscategory'


class CreationFosscategoryDomain(models.Model):
    id = models.IntegerField(primary_key=True)
    fosscategory = models.ForeignKey(CreationFosscategory, models.DO_NOTHING)
    domain = models.ForeignKey('CreationDomain', models.DO_NOTHING)
    is_primary = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'creation_fosscategorydomain'
        # unique_together = (('fosscategory', 'domain'),)


class CreationTutorialresource(models.Model):
    tutorial_detail = models.ForeignKey('CreationTutorialdetail', models.DO_NOTHING)
    # tutorial_detail_id = models.IntegerField(db_column='tutorial_detail_id')
    # common_content = models.ForeignKey('CreationTutorialcommoncontent', models.DO_NOTHING)
    common_content_id = models.IntegerField(db_column='common_content_id')
    language = models.ForeignKey('CreationLanguage', models.DO_NOTHING)
    # language_id = models.IntegerField(db_column='language_id')
    outline = models.TextField()
    # outline_user = models.ForeignKey('AuthUser', models.DO_NOTHING)
    outline_user_id = models.IntegerField(db_column='outline_user_id')
    outline_status = models.PositiveSmallIntegerField()
    script = models.CharField(max_length=255)
    # script_user = models.ForeignKey('AuthUser', models.DO_NOTHING, related_name='creationtutorialresource_script_user_set')
    script_user_id = models.IntegerField(db_column='script_user_id')
    script_status = models.PositiveSmallIntegerField()
    timed_script = models.CharField(max_length=255)
    video = models.CharField(max_length=255)
    video_id = models.CharField(max_length=255, blank=True, null=True)
    playlist_item_id = models.CharField(max_length=255, blank=True, null=True)
    video_thumbnail_time = models.TimeField()
    # video_user = models.ForeignKey('AuthUser', models.DO_NOTHING, related_name='creationtutorialresource_video_user_set')
    video_user_id = models.IntegerField(db_column='video_user_id')
    video_status = models.PositiveSmallIntegerField()
    status = models.PositiveSmallIntegerField()
    version = models.PositiveSmallIntegerField()
    hit_count = models.PositiveIntegerField()
    created = models.DateTimeField()
    updated = models.DateTimeField()
    publish_at = models.DateTimeField(blank=True, null=True)
    assignment_status = models.PositiveSmallIntegerField()
    extension_status = models.PositiveIntegerField()
    submissiondate = models.DateTimeField()
    is_unrestricted = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'creation_tutorialresource'
        # unique_together = (('tutorial_detail', 'language'),)

class CreationLevel(models.Model):
    level = models.CharField(max_length=255)
    code = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'creation_level'

class CreationTutorialdetail(models.Model):
    foss = models.ForeignKey(CreationFosscategory, models.DO_NOTHING)
    # foss_id = models.IntegerField(db_column='foss_id_id')
    tutorial = models.CharField(max_length=255)
    level = models.ForeignKey('CreationLevel', models.DO_NOTHING)
    # level_id = models.IntegerField(db_column='level_id')
    order = models.IntegerField()
    # user = models.ForeignKey('AuthUser', models.DO_NOTHING)
    user_id = models.IntegerField(db_column='user_id')
    created = models.DateTimeField()
    updated = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'creation_tutorialdetail'
        # unique_together = (('foss', 'tutorial', 'level'),)

class CreationLanguage(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(unique=True, max_length=255)
    code = models.CharField(max_length=10)
    user = models.IntegerField()
    created = models.DateTimeField()
    updated = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'creation_language'

# Creation Models ---------------------------------------------------------------------------