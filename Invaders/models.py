from django.db import models


# Create your models here.
class User(models.Model):
    """
    User information
    property:
    username
    password
    high_score: high score
    create_date: create date
    method:
    __str__(): get username
    get_score(): get user high score
    """
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    high_score = models.IntegerField(default=0)
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

    def get_score(self):
        return self.high_score
