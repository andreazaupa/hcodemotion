load('application');

before(loadPage, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
  this.title = 'New page';
  this.page = new Page;
  render();
});

action(function create() {
  Page.create(req.body.Page, function (err, page) {
    if (err) {
      flash('error', 'Page can not be created');
      render('new', {
        page: page,
        title: 'New page'
      });
    } else {
      flash('info', 'Page created');
      redirect(path_to.pages);
    }
  });
});

action(function index() {
  this.title = 'Pages index';
  Page.all(function (err, pages) {
    render({
      pages: pages
    });
  });
});

action(function show() {
  this.title = 'Page show';
  render();
});

action(function edit() {
  this.title = 'Page edit';
  render();
});

action(function update() {
  this.page.updateAttributes(body.Page, function (err) {
    if (!err) {
      flash('info', 'Page updated');
      redirect(path_to.page(this.page));
    } else {
      flash('error', 'Page can not be updated');
      this.title = 'Edit page details';
      render('edit');
    }
  }.bind(this));
});

action(function destroy() {
  this.page.destroy(function (error) {
    if (error) {
      flash('error', 'Can not destroy page');
    } else {
      flash('info', 'Page successfully removed');
    }
    send("'" + path_to.pages + "'");
  });
});

function loadPage() {
  Page.find(params.id, function (err, page) {
    if (err) {
      redirect(path_to.pages);
    } else {
      this.page = page;
      next();
    }
  }.bind(this));
}
