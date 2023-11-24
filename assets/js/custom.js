function postComment(article_id) {
    var valid = 1;
    if ($('#comment-name').val() == '') {
        $('#comment-name-div').addClass('has-error');
        $('#comment-name-help').html('Name is required');
        valid = 0;
    } else {
        $('#comment-name-div').removeClass('has-error');
        $('#comment-name-help').html('');
    }

    if ($('#comment-email').val() == '') {
        $('#comment-email-div').addClass('has-error');
        $('#comment-email-help').html('Email is required');
        valid = 0;
    } else {
        $('#comment-email-div').removeClass('has-error');
        $('#comment-email-help').html('');
    }

    if ($('#comment-message').val() == '') {
        $('#comment-message-div').addClass('has-error');
        $('#comment-message-help').html('Comment cannot be empty');
        valid = 0;
    } else {
        $('#comment-message-div').removeClass('has-error');
        $('#comment-message-help').html('');
    }

    if (valid == 1) {
        var dataurl = 'article_id=' + article_id + '&parent_id=' + $('#comment-parent').val() + '&name=' + $('#comment-name').val() + '&email=' + $('#comment-email').val() + '&message=' + $('#comment-message').val();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var messageType = this.responseText.split('####')[0];
                var message = this.responseText.split('####')[1];
                $('#comment-response-message').html(message);
                if (messageType == 'success') {
                    $('#comment-name').val('');
                    $('#comment-email').val('');
                    $('#comment-message').val('');

                    $('#comment-reply-div').addClass('hidden');
                    $('#comment-parent').val('0');
                    $('#comment-reply-name').html('');
                    $('#comment-reply-message').html('');
                }
                setTimeout(function() {
                    $('#comment-response-message').html('');
                }, 5000);
            }
        };
        xhttp.open("POST", static_url() + "staticfeeds/addComment", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(dataurl);
    }
}


function replyComment(id, name, message) {
    $('#comment-reply-div').removeClass('d-none');
    $('html, body').animate({
        scrollTop: $('#comment-reply-div').offset().top
    }, 'slow');
    $('#comment-parent').val(id);
    $('#comment-reply-name').html(name);
    $('#comment-reply-message').html(message);
}

function cancelReply() {
    $('#comment-reply-div').addClass('d-none');
    $('#comment-parent').val('0');
    $('#comment-reply-name').html('');
    $('#comment-reply-message').html('');

    $('#comment-name').val('');
    $('#comment-email').val('');
    $('#comment-message').val('');

    $('#comment-name-div').removeClass('has-error');
    $('#comment-name-help').html('');
    $('#comment-email-div').removeClass('has-error');
    $('#comment-email-help').html('');
    $('#comment-message-div').removeClass('has-error');
    $('#comment-message-help').html('');
}

function commentThumbs(article_id, comment_id, value) {
    var dataurl = 'article_id=' + article_id + '&comment_id=' + comment_id + '&value=' + value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var messageType = this.responseText.split('####')[0];
            var thumbs_ups = this.responseText.split('####')[1];
            var thumbs_downs = this.responseText.split('####')[2];
            if (messageType == 'success') {
                $('#thumbs-ups-' + comment_id).html(thumbs_ups);
                $('#thumbs-downs-' + comment_id).html(thumbs_downs);
            }
        }
    };
    xhttp.open("POST", static_url() + "staticfeeds/addThumbs", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(dataurl);
}