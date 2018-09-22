#include <eosiolib/eosio.hpp>

class addressbook : public eosio::contract
{
  public:
    addressbook(account_name s) : contract(s),   // initialization of the base class for the contract
                                  _records(s, s) // initialize the table with code and scope NB! Look up definition of code and scope
    {
    }

    /// @abi action
    void create(account_name owner, uint32_t phone, const std::string &fullname, const std::string &address)
    {

        require_auth(owner);

        // _records.end() is in a way similar to null and it means that the value isn't found
        // uniqueness of primary key is enforced at the library level but we can enforce it in the contract with a
        // better error message
        eosio_assert(_records.find(owner) == _records.end(), "This record already exists in the addressbook");

        eosio_assert(fullname.size() <= 20, "Full name is too long");
        eosio_assert(address.size() <= 50, "Address is too long");

        // we use phone as a secondary key
        // secondary key is not necessarily unique, we will enforce its uniqueness in this contract
        auto idx = _records.get_index<N(byphone)>();
        eosio_assert(idx.find(phone) == idx.end(), "Phone number is already taken");

        _records.emplace(owner, [&](auto &rcrd) {
            rcrd.owner = owner;
            rcrd.phone = phone;
            rcrd.fullname = fullname;
            rcrd.address = address;
        });
    }

    /// @abi action
    void remove(account_name owner)
    {

        require_auth(owner);

        auto itr = _records.find(owner);
        eosio_assert(itr != _records.end(), "Record does not exit");
        _records.erase(itr);
    }

    /// @abi action
    void update(account_name owner, const std::string &address)
    {

        require_auth(owner);

        auto itr = _records.find(owner);
        eosio_assert(itr != _records.end(), "Record does not exit");
        eosio_assert(address.size() <= 50, "Address is too long");
        _records.modify(itr, owner, [&](auto &rcrd) {
            rcrd.address = address;
        });
    }

  private:
    // Setup the struct that represents the row in the table
    /// @abi table records
    struct record
    {
        account_name owner; // primary key
        uint32_t phone;
        std::string fullname;
        std::string address;

        uint64_t primary_key() const { return owner; }
        uint64_t by_phone() const { return phone; }
    };

    typedef eosio::multi_index<N(records), record,
                               eosio::indexed_by<N(byphone), eosio::const_mem_fun<record, uint64_t, &record::by_phone>>>
        record_table;

    // Creating the instance of the `record_table` type
    record_table _records;
};

EOSIO_ABI(addressbook, (create)(remove)(update))