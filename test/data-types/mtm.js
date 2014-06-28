
describe('mtm', function () {
    before(function (done) {
        client.query(sql.truncate('mtm'), done);
    });
    it('should be empty', function (done) {
        $('a[href="/mtm"]')[0].click();
        page.load(function () {
            $('.x-table tbody tr').length.should.equal(0);
            $('a[href="/mtm/add"]')[0].click();
            page.load(done);
        });
    });
    it('add mtm', function (done) {
        async.series([
            function (done) {
                $('[name="view[mtm][records][0][columns][name1]"]').val('a');
                $('[name="view[mtm][records][0][columns][name2]"]').val('1');
                $('[name="action[another]"')[0].click();
                page.load(done);
            },
            function (done) {
                $('.alert-success strong').text().should.equal('Success:');
                $('[name="view[mtm][records][0][columns][name1]"]').val('b');
                $('[name="action[another]"')[0].click();
                page.load(done);
            },
            function (done) {
                $('.alert-success strong').text().should.equal('Success:');
                $('[name="view[mtm][records][0][columns][name1]"]').val('c');
                $('[name="view[mtm][records][0][columns][name2]"]').val('3');
                $('[name="action[save]"')[0].click();
                page.load(done);
            }	
        ], function () {
            win.location.pathname.should.equal('/mtm');
            $('.alert-success strong').text().should.equal('Success:');
            $('.x-table tbody tr').length.should.equal(3);
            $('.x-table tbody tr:eq(0) a').text().should.equal('a');
            $('.x-table tbody tr:eq(1) a').text().should.equal('b');
            $('.x-table tbody tr:eq(2) a').text().should.equal('c');
            done();
        });
    });
    after(function (done) {
        $('a[href="/"]')[0].click();
        page.load(done);
    });
});
