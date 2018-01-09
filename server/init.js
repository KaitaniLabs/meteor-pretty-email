
OriginalHandlebars.registerHelper('footer', function() {
    const options = _.extend(this, PrettyEmail.options);
    if (options.companyName) {
        return Handlebars.templates.footer(options);
    }
});

OriginalHandlebars.registerHelper('preheader', function() {
    const options = _.extend(this, PrettyEmail.options);
    return Handlebars.templates.preheader(options);
});

OriginalHandlebars.registerHelper('followBlock', function() {
    const options = _.extend(this, PrettyEmail.options);
    return Handlebars.templates.followBlock(options);
});

OriginalHandlebars.registerHelper('alertIconDisplay', function(icon) {
    return "<img src='"+Meteor.absoluteUrl("packages/allerion_meteor-pretty-email/client/images/"+icon+".png")+"'>";
});

OriginalHandlebars.registerHelper('eachLine', function(content, options){
    if(!_.isUndefined(content)){
        return _.reduce(content.split('\n'),function(result, content){ return result + options.fn(content); }, '');
    }
});

PrettyEmail = {
    options: {
        showFooter : true,
        showFollowBlock : true,
        showPreheader : true,
        preheaderPhone : true,
        preheaderEmail : true,
        alertType : "danger",
        alertIcon : "caution"
    },
    defaults: {
        verifyEmail: {
            heading: 'Just one more step...',
            message: 'Click on the big button below to activate your account',
            buttonText: 'Activate account'
        },
        resetPassword: {
            heading: 'Reset your password',
            message: 'Click the big button below to reset your password',
            buttonText: 'Reset password'
        },
        enrollAccount: {
            heading: 'To start using our service, simply click the button below',
            buttonText: 'Set password'
        }
    },
    style: {
        fontFamily: 'Helvetica',
        fontColor: '#606060',
        buttonColor: '#FFFFFF',
        buttonBgColor: '#a173c4',
        alertBlock : {
            background : "#E36C44",
            color: "#ffffff"
        }
    },
    stylePresets : {
        alertBlock : {
            success : {
                background: "#84BF7E",
                color: "#ffffff"
            },
            danger : {
                background : "#E36C44",
                color: "#ffffff"
            },
            primary : {
                background : "#5482CC",
                color: "#ffffff"
            },
            info : {
                background : "#54BECC",
                color: "#000000"
            },
            warning : {
                background : "#E3AB42",
                color: "#ffffff"
            }
        }
    },  
    setOptions(options) {
        _.extend(this.options,options);
    },
    send(template, options) {
        options = _.extend({}, this.options, options);

        return Email.send({
            from: options.from,
            to: options.to,
            subject: options.subject,
            html: this.render(template, options)
        });
    },
    render(template, options) {
        
        options.style = this.style;
        options = _.extend({}, this.options, options);

        // Handle style presets
        if(template === "alert"){
            options.style.alertBlock = PrettyEmail.stylePresets.alertBlock[options.alertType];
        }

        if (typeof template === 'string') {
            template = Handlebars.templates[template];
        }

        if (typeof template === 'function') {
            return template(options);
        } else {
            throw new Error("PrettyEmail can't render template. Pass template name or handlebars function.");
        }
    }
};

const Accounts = ((Package['accounts-base']) ? Package['accounts-base'].Accounts : undefined);

if(!_.isUndefined(Accounts)){
  
    Accounts.emailTemplates.verifyEmail.subject = function(user){
        
        return 'Activate your account';
   
    };

    Accounts.emailTemplates.verifyEmail.html = function(user,verifyEmailUrl){
        
        const options = _.extend({}, PrettyEmail.defaults.verifyEmail, {
            subject: Accounts.emailTemplates.verifyEmail.subject(user),
            buttonUrl: verifyEmailUrl
        });

        return PrettyEmail.render('call-to-action', options);
    
    };

    Accounts.emailTemplates.resetPassword.subject = function(user){
        
        return 'Reset your password';
   
    };

    Accounts.emailTemplates.resetPassword.html = function(user,resetPasswordUrl){
        
        const options = _.extend({}, PrettyEmail.defaults.resetPassword, {
            subject: Accounts.emailTemplates.resetPassword.subject(user),
            buttonUrl: resetPasswordUrl
        });

        return PrettyEmail.render('call-to-action', options);
    
    };

    Accounts.emailTemplates.enrollAccount.subject = function(user){
        
        return 'An account has been created for you';
   
    };

    Accounts.emailTemplates.enrollAccount.html = function(user,enrollAccountUrl){
        
        const options = _.extend({}, PrettyEmail.defaults.enrollAccount, {
            subject: Accounts.emailTemplates.enrollAccount.subject(user),
            buttonUrl: enrollAccountUrl
        });

        return PrettyEmail.render('call-to-action', options);
    
    };

}

Meteor.startup(function() {
    if (PrettyEmail.options.from) {
        return Accounts.emailTemplates.from = PrettyEmail.options.from;
    }
});
