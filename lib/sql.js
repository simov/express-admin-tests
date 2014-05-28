
exports.truncate = function (table) {
    switch (true) {
        case this.client.mysql:
            return 'SET FOREIGN_KEY_CHECKS=0;\
                    truncate table `'+table+'`;\
                    SET FOREIGN_KEY_CHECKS=1;';

        case this.client.pg:
            return 'truncate table "'+table+'" restart identity cascade;\
                    alter sequence '+table+'_id_seq restart with 1;';
        
        case this.client.sqlite:
            return "delete from `"+table+"`;\
                    delete from SQLITE_SEQUENCE where name='"+table+"';";
    }
}

exports.client = {}
