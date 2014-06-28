
describe('otm', function () {
    before(function (done) {
        client.query(sql.truncate('otm'), done);
    });
    it('should be empty', function (done) {
        $('a[href="/otm"]')[0].click();
        page.load(function () {
            $('.x-table tbody tr').length.should.equal(0);
            $('a[href="/otm/add"]')[0].click();
            page.load(done);
        });
    });
    it('add otm', function (done) {
        async.series([
            function (done) {
                $('[name="view[otm][records][0][columns][name1]"]').val('a');
                $('[name="action[another]"')[0].click();
                page.load(done);
            },
            function (done) {
                $('.alert-success strong').text().should.equal('Success:');
                $('[name="view[otm][records][0][columns][name1]"]').val('b');
                $('[name="action[another]"')[0].click();
                page.load(done);
            },
            function (done) {
                $('.alert-success strong').text().should.equal('Success:');
                $('[name="view[otm][records][0][columns][name1]"]').val('c');
                $('[name="action[save]"')[0].click();
                page.load(done);
            }	
        ], function () {
            win.location.pathname.should.equal('/otm');
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
